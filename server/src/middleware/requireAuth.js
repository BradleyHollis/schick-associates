import jwt from "jsonwebtoken";

export default function requireAuth(req, res, next) {
  const token = req.cookies?.[process.env.COOKIE_NAME || "auth"];
  if (!token) return res.status(401).json({ error: "Unauthenticated" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}
