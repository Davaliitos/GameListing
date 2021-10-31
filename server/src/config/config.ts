import { config } from 'dotenv'

if(process.env.NODE_ENV !== 'production'){
    config();
}

export const configuration = {
    'dev': {
        'aws_region': process.env.AWS_REGION,
        'aws_profile': process.env.AWS_PROFILE,
        'games_table': process.env.GAMES_TABLE
    }
}