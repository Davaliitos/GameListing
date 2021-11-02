import { Router, Request, Response } from 'express';
import { GameItem } from '../../../models/GameItem';
import { createGame, getAllGames, deleteGame } from '../../../dataLayer/gamesAccess';
import { GameLift } from 'aws-sdk';

import * as AWS from '../../../aws';

const router: Router = Router();


//Get all game items
router.get('/', async( req: Request, res: Response) => {

    try{
        const games = await getAllGames(false);
        games.forEach(game => {
            if(game.images){
                game.images.forEach(image => {
                    if(image.url){
                        try{
                            image.url = AWS.getGetSignedUrl(image.url);
                        }catch(err){
                            console.log(err)
                        }
                    }
                })
            }
        })
        res.send(JSON.stringify({listings: games}))
    }catch(err){
        res.status(400).send({
            error: err
        })
    }
    
})


//Create game
router.post('/', async(req: Request, res: Response) => {

    try{
        const{
            title,
            subtitle,
            category,
            description,
            author,
            duration,
            isDownloadable,
            isStreamable,
            images,
            tags,
            replayBundleUrlJson,
            isPremium
        } = req.body as GameItem;
        
        if(!title || !subtitle || !category || !images){
            return res.status(400).send({
                message: 'Bad Request'
            })
        }
        const game = await createGame({
            title,
            subtitle,
            category,
            description,
            author,
            duration,
            isDownloadable,
            isStreamable,
            images,
            tags,
            replayBundleUrlJson,
            isPremium
        } as GameItem);
        res.send(game)
    }catch(err){
        res.status(400).send({
            error: err
        });
    }
})

//Delete game
router.delete('/:gameId', async(req: Request, res: Response) => {
    const { gameId } = req.params;
    try{
        const answer = await deleteGame(gameId);
        if(answer){
            res.send(answer);
        }else{
            res.sendStatus(404);
        }
    }catch(err){
        res.status(400).send({
            error: err
        })
    }
})


//Get a signed url to put a new item in the bucket
router.get('/signed-url/:fileName', async(req: Request, res: Response) => {
    let { fileName } = req.params;
    if(!fileName){
        return res.status(400).send({
            message: 'FileName is required'
        })
    }
    try{
        const url = AWS.getPutSignedUrl(fileName);
        return res.status(201).send({url: url})
    }catch(err){
        return res.status(500).send({
            error: err
        })
    }
    
})

export const GamesRouter: Router = router;