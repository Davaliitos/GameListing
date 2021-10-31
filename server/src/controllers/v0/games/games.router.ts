import { Router, Request, Response } from 'express';
import { GameItem } from '../../../models/GameItem';
import { getAllGames } from '../../../dataLayer/gamesAccess';

const router: Router = Router();


//Get all game items
router.get('/', async( req: Request, res: Response) => {
    
    const games = await getAllGames(false);

    res.send(games)
})

export const GamesRouter: Router = router;