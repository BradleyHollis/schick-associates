import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));

app.get('/health', (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 4000;
await mongoose.connect(process.env.MONGO_URI);
app.listen(PORT, () => console.log(`API running → http://localhost:${PORT}`));