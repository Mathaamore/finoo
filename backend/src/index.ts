import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

import { MasterRouter } from './routers/MasterRouter';

const app = express();
const PORT = process.env.PORT || 5000;

import { Pool } from 'pg';

const pool = new Pool({
  database: 'postgres',
  user: 'postgres',
  password: 'postgres',
  host: process.env.DATABASE_HOST,
  port: 5432,
});

app.use(cors({
    // origin: 'http://localhost:3000'
}))

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/api', new MasterRouter(pool).router);

app.on('close', () => {
    app.removeAllListeners();
});

app.listen(PORT, err => {
  console.log("Backend started on port " + PORT)
  if (err) {
    return process.exit(1);
  }
});

export default app