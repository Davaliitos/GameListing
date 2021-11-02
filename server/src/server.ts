import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path'
import { Request, Response } from 'express';

import { IndexRouter } from './controllers/v0/index.router';
const PORT = process.env.PORT || 8000;

async function startServer(){

    const app = express();

    //CORS Should be restricted
    app.use(cors({
        origin: 'http://localhost:3000'
    }))

    app.use(express.json());
    app.use(morgan('combined'))
    app.use(express.static(path.join(__dirname, '..', 'public')));


    app.use('/api/v0', IndexRouter);

    app.get('/*',(req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
    })

    app.listen(PORT, () => {
        console.log(`Server running on PORT ${PORT}`)
    })
}

startServer();