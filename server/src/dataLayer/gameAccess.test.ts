import request from 'supertest'
import app from '../app'
import { GameItem } from '../models/GameItem';


describe('Game API', () => {


    const game:GameItem = {
        title: 'Test Title',
        subtitle: 'Test Subtitle',
        category: 'Test Category',
        description: 'Test Description',
        author: 'Test Author',
        duration: 12,
        isDownloadable: false,
        isStreamable: true,
        isPremium: false,
        images: [{
            id: '1',
            url: 'image.url',
            type: 1
        }],
        tags: [],
        gameId: ''
    }


    describe('Test GEt /games', () => {
        it('It should get a 200 success', async() => {
            const response = await request(app)
                .get('/api/v0/games')
                .expect(200);
        })
    })

    
    let createdGame: GameItem;

    describe('Test POST /game', () => {
        test('It should respond with 201 created', async() => {
            const response = await request(app)
                .post('/api/v0/games')
                .send(game)
                .expect(201)

            createdGame = response.body as GameItem;
            expect(createdGame).toBeInstanceOf(Object)
        })

        test('It should return a 404 if a required field is missing', async() => {
            const newGame = {...game}
            newGame.title = undefined;
            const response = await request(app)
                .post('/api/v0/games')
                .send(newGame)
                .expect(400)
        })
    })

    describe('Test DELETE /game', () => {
        test('It should delete game', async() => {

            const gameId = createdGame.gameId;
            expect(gameId).toBeDefined();

            const response = await request(app)
                .delete(`/api/v0/games/${gameId}`)
                .expect(200)
        })

        test('It should return an 404 if a gameId is not provided', async() => {
            const response = await request(app)
                .delete(`/api/v0/games/`)
                .expect(404)
        })

        test('It should return an 404 if a gameId is not found', async() => {
            const response = await request(app)
                .delete(`/api/v0/games/987654321`)
                .expect(404)
        })
    })


    describe('TEST /signed-url', () => {
        test('It should return a signed url', async() => {

            const fileName = 'testname';
            const response = await request(app)
                .get(`/api/v0/games/signed-url/${fileName}`)
                .expect(201)
        })
    })
})