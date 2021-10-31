import { Router, Request, Response } from 'express';
import { GamesRouter } from './games/games.router';

const router: Router = Router();

router.use('/games', GamesRouter);

router.get('/', async (req: Request, res: Response) => {
    res.send('V0');
});

export const IndexRouter: Router = router;