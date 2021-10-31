import * as AWS from 'aws-sdk';
import * as uuid from 'uuid';

import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { GameItem } from 'src/models/GameItem';

import { configuration } from '../config/config';

const c = configuration.dev;

if(c.aws_profile !== 'DEPLOYED'){
    const credentials = new AWS.SharedIniFileCredentials({profile: c.aws_profile});
    AWS.config.credentials = credentials;
}

export const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: c.aws_region
})


export async function getAllGames(isPremium: boolean): Promise<GameItem[]>{
    try{
        const result = await dynamoDB.scan({
            TableName: c.games_table,
            FilterExpression: 'isPremium = :isPremium',
            ExpressionAttributeValues: {
                ':isPremium': isPremium
            }
        }).promise();
        const items = result.Items;
        return items as GameItem[];
    }catch(err){
        console.error(err)
        return []
    }
    
}

export async function createGame(game: GameItem): Promise<GameItem>{

    const gameId = uuid.v4();
    const version = "1"

    const gameRequest = {
        gameId,
        ...game,
        version
    }

    await dynamoDB.put({
        TableName: c.games_table,
        Item: gameRequest
    }).promise();

    return gameRequest
}

export async function deleteGame(gameId: string): Promise<AWS.DynamoDB.AttributeMap | undefined>{

    const result = await dynamoDB.delete({
        TableName: c.games_table || '',
        Key:{
            gameId
        }
    }).promise()
    
    return result.Attributes;
}