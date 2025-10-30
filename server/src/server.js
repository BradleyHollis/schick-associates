import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { z } from "zod";
import { customAlphabet } from "nanoid";
import { sendEmail } from "./utils/sendEmail.js";
import Subscriber from './models/Subscriber.js';
import ContactMessage from './models/ContactMessage.js';

// import authRoutes from './routes/auth.js';
import requireAuth from './middleware/requireAuth.js';

const app = express();

const PORT = process.env.PORT || 3001;
const PUBLIC_SERVER_URL =
  process.env.SERVER_URL ||
  process.env.RENDER_EXTERNAL_URL ||
  `http://localhost:${PORT}`;

app.use(helmet());
app.use(morgan('dev'));
app.set('trust proxy', 1);
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

const allowedOrigins = [
  'http://localhost:5173',            // Vite dev
  'http://localhost:3000',            // Next/CRA dev (if used)
  'https://www.schickassociates.com', // prod site
];

app.use(cors({
  origin: (origin, cb) => {
    // allow non-browser tools (no origin) and whitelisted origins
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

app.get('/health', (_req, res) => res.json({ ok: true }));

// mount auth
// app.use('/api/auth', authRoutes);

// example protected route
app.get('/api/me', requireAuth, (req, res) => {
  res.json({ userId: req.user.sub, role: req.user.role });
});


const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 40);

const SubscribeSchema = z.object({
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  source: z.string().optional(),
});


app.post("/api/subscribe", async (req, res) => {
  try {
    const { email, firstName, lastName, source } = SubscribeSchema.parse(req.body);
    const token = nanoid();

    const existing = await Subscriber.findOne({ email });
    if (existing?.status === "confirmed") {
      return res.json({ ok: true, message: "You're already confirmed. Thank you!" });
    }

    if (existing) {
      existing.firstName = firstName ?? existing.firstName;
      existing.lastName = lastName ?? existing.lastName;
      existing.source = source ?? existing.source;
      existing.status = "pending";
      existing.confirmToken = token;
      await existing.save();
    } else {
      await Subscriber.create({
        email,
        firstName,
        lastName,
        source,
        status: "pending",
        confirmToken: token,
      });
    }

    const confirmUrl = `${PUBLIC_SERVER_URL}/api/subscribe/confirm?token=${encodeURIComponent(token)}`;

    res.json({
      ok: true,
      message: "Please check your email to confirm your subscription.",
      devToken: token, // helpful for testing before email setup
      confirmUrl,
    });
  } catch (e) {
    console.error(e);
    res.status(400).json({ ok: false, message: "Invalid data or failed to save." });
  }
});


app.get("/api/subscribe/confirm", async (req, res) => {
  const token = typeof req.query.token === "string" ? req.query.token : "";
  if (!token) return res.status(400).send("Invalid token.");

  const sub = await Subscriber.findOne({ confirmToken: token });
  if (!sub) return res.status(404).send("Token not found or already used.");

  sub.status = "confirmed";
  sub.confirmedAt = new Date();
  sub.confirmToken = null;
  await sub.save();

  // ✅ Send a thank-you email
  try {
    await sendEmail({
      to: sub.email,
      subject: "Welcome to Schick & Associates",
      html: `
        <p>Hi${sub.name ? " " + sub.name : ""},</p>
        <p>Thank you for confirming your subscription!</p>
        <p>We’ll keep you updated with important news and insights.</p>
        <br>
        <p>— The Schick & Associates Team</p>
      `
    });
  } catch (err) {
    console.error("Error sending confirmation email:", err);
  }

  return res.redirect(`${process.env.CLIENT_URL || ''}/subscribe-confirmed`);
});

app.post("/api/contact", async (req, res) => {
  try {
    // normalize input
    const email   = String(req.body.email || "").trim().toLowerCase();
    const name    = String(req.body.name || "").trim();
    const phone   = String(req.body.phone || "").trim();
    const subject = String(req.body.subject || "").trim();
    const message = String(req.body.message || "").trim();

    if (!email || !message) {
      return res.status(400).json({ ok: false, message: "Email and message are required." });
    }

    // 1) persist
    await ContactMessage.create({ email, name, phone, subject, message });

    // 2) always try to notify admin (but don't fail the request if mailer errors)
    const adminPromise = sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `New contact from ${name || "Anonymous"}`,
      text: `From: ${name || "(no name)"} <${email}>
      Phone: ${phone || "(none)"}
      Subject: ${subject || "(none)"}${message}`
    });

    // 3) try user auto-reply (this is what 422s on Trial plans)
    const userPromise =
      process.env.MS_RESTRICTED === "true"
        ? Promise.resolve() // skip/redirect while on trial
        : sendEmail({
            to: email,
            subject: "We received your message — Schick & Associates",
            html: `<p>Hi${name ? " " + name : ""},</p>
                   <p>Thanks for reaching out. We’ve received your message and will be in touch shortly.</p>
                   <hr>
                   <p><strong>Your message</strong><br>${message.replace(/\n/g, "<br>")}</p>`
          });

    // don’t throw if either email fails — just log it
    const [adminResult, userResult] = await Promise.allSettled([adminPromise, userPromise]);
    if (adminResult.status === "rejected") console.warn("Admin email failed:", adminResult.reason?.message || adminResult.reason);
    if (userResult.status === "rejected")  console.warn("User email failed:",  userResult.reason?.message  || userResult.reason);

    // 4) respond success to the client
    return res.json({ ok: true, message: "Thanks—your message has been received." });

  } catch (e) {
    console.error(e);
    return res.status(400).json({ ok: false, message: "Invalid data." });
  }
});

await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
console.log('Mongo connected:', mongoose.connection.host);
app.listen(PORT, () => console.log(`API → http://localhost:${PORT}`));