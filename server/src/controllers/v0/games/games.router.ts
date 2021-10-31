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
                    try{
                        image.url = AWS.getGetSignedUrl(image.url);
                    }catch(err){
                        console.log(err)
                    }
                })
            }
        })
        res.send(games)
    }catch(err){
        res.status(400).send({
            error: err
        })
    }
    
})


//Create game
router.post('/', async(req: Request, res: Response) => {

    try{
        const { title, fileName} = req.body;
        const newGame: GameItem = req.body;
        
        if(!title){
            return res.status(400).send({
                message: 'Title is required'
            })
        }

        if(!fileName){
            return res.status(400).send({
                message: 'FileName is required'
            })
        }
        const game = await createGame(newGame);
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
        const answer = await deleteGame(gameId)
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
    const url = AWS.getPutSignedUrl(fileName);
    res.status(201).send({url: url})
})

export const GamesRouter: Router = router;