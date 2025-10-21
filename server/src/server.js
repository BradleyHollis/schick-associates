import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { z } from "zod";
import { customAlphabet } from "nanoid";
import Subscriber from './models/Subscriber.js';
import ContactMessage from './models/ContactMessage.js';

// import authRoutes from './routes/auth.js';
import requireAuth from './middleware/requireAuth.js';

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.get('/health', (_req, res) => res.json({ ok: true }));

// mount auth
// app.use('/api/auth', authRoutes);

// example protected route
app.get('/api/me', requireAuth, (req, res) => {
  res.json({ userId: req.user.sub, role: req.user.role });
});


// simple health check (optional)
app.get("/health", (req, res) => res.json({ ok: true }));

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

    const confirmUrl = `${process.env.SERVER_URL}/api/subscribe/confirm?token=${encodeURIComponent(token)}`;

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

  return res.redirect(`${process.env.CLIENT_URL}/subscribe-confirmed`);
});


app.post("/api/contact", async (req, res) => {
  try {
    const { email, name, phone, message } = req.body;
    if (!email || !message) {
      return res.status(400).json({ ok: false, message: "Email and message are required." });
    }

    await ContactMessage.create({ email, name, phone, message });
    res.json({ ok: true, message: "Thanks—your message has been received." });
  } catch (e) {
    console.error(e);
    res.status(400).json({ ok: false, message: "Invalid data." });
  }
});

const PORT = process.env.PORT || 4000;
await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
console.log('Mongo connected:', mongoose.connection.host);
app.listen(PORT, () => console.log(`API → http://localhost:${PORT}`));
