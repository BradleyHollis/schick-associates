import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = Router();
const cookieName = process.env.COOKIE_NAME || "auth";
const isProd = process.env.NODE_ENV === "production";

const cookieOpts = {
  httpOnly: true,
  sameSite: "lax",
  secure: isProd,
  path: "/",
  maxAge: 1000 * 60 * 60 * 8 // 8 hours
};

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body || {};
  if (!username || !email || !password) return res.status(400).json({ error: "Missing fields" });

  const exists = await User.findOne({ $or: [{ email }, { username }] });
  if (exists) return res.status(409).json({ error: "Username or email already in use" });

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ username, email, passwordHash });

  res.status(201).json({ id: user._id, username: user.username, email: user.email });
});

router.post("/login", async (req, res) => {
  const { usernameOrEmail, password } = req.body || {};
  if (!usernameOrEmail || !password) return res.status(400).json({ error: "Missing credentials" });

  const user = await User.findOne({
    $or: [{ email: usernameOrEmail.toLowerCase() }, { username: usernameOrEmail }]
  });
  if (!user || !user.isActive) return res.status(401).json({ error: "Invalid login" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid login" });

  user.lastLogin = new Date();
  await user.save();

  const token = jwt.sign({ sub: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "8h" });
  res.cookie(cookieName, token, cookieOpts);
  res.json({ id: user._id, username: user.username, email: user.email });
});

router.post("/logout", (req, res) => {
  res.clearCookie(cookieName, cookieOpts);
  res.json({ ok: true });
});

export default router;
