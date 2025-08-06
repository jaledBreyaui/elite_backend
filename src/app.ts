import express from 'express';
import cors from 'cors';
import productRoute from './routes/routes';
const app = express();

app.use(cors(
    {
        origin: "https://elite-frontend-gilt.vercel.app/",
        credentials: true,
        methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
))

app.use(express.static(__dirname))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', productRoute)



export default app