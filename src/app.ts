import 'dotenv/config';
import morgan from 'morgan';
import * as fs from 'node:fs';
import path from 'path';
import defaultRouter from './routes/index';

import cors from 'cors';
import express from 'express';

const app = express();

const logDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
const accessLogStream = fs.createWriteStream(path.join(logDir, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

app.use(cors());
app.use(express.json());

app.use(`/api/v${process.env.API_VERSION || 1}`, defaultRouter);

export default app;
