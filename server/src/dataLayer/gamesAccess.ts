import * as AWS from 'aws-sdk';
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
            TableName: c.games_table || '',
            FilterExpression: 'isPremium = :isPremium',
            ExpressionAttributeValues: {
                ':isPremium': isPremium
            }
        }).promise();
        const items = result.Items;
        return items as GameItem[];
    }catch(err){
        console.error(err)
    }
    
    return []
    
}