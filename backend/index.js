import express from 'express';
import 'dotenv/config';
import { dbConnect } from './database.js';
import MainRouter from './routes/AllRoutes.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use('/api/v1',MainRouter);

app.listen(PORT, () => {
    dbConnect();
    console.log(`Server Started Successfully at ${PORT}`);
})

app.get("/",(req,res) => {
    res.send(`<h1>This is a Homepage...</h1>`)
})