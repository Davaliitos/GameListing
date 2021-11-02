import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path'
import { Request, Response } from 'express';
import compression from 'compression';
import cluster from 'cluster';
import os from 'os';

import { IndexRouter } from './controllers/v0/index.router';
const PORT = process.env.PORT || 8000;

async function startServer(){

    const app = express();

    //CORS Should be restricted
    app.use(cors({
        origin: 'http://localhost:3000'
    }))

    app.use(express.json());
    app.use(compression());
    app.use(morgan('combined'))
    app.use(express.static(path.join(__dirname, '..', 'public')));


    app.use('/api/v0', IndexRouter);

    app.get('/*',(req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
    })

    
    if(cluster.isMaster){
        const NUM_WORKERS = os.cpus().length;
        for(let i=0; i<NUM_WORKERS; i++){
            cluster.fork();
        }
    }else{
        app.listen(PORT, () => {
            console.log(`Server running on PORT ${PORT}`)
        })
    }
}

startServer();