import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.js';
import requireAuth from './middleware/requireAuth.js';

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));

app.get('/health', (_req, res) => res.json({ ok: true }));

// mount auth
app.use('/api/auth', authRoutes);

// example protected route
app.get('/api/me', requireAuth, (req, res) => {
  res.json({ userId: req.user.sub, role: req.user.role });
});

const PORT = process.env.PORT || 4000;
await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
console.log('Mongo connected:', mongoose.connection.host);
app.listen(PORT, () => console.log(`API → http://localhost:${PORT}`));
