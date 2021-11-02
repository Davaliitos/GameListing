import { config } from 'dotenv'

if(process.env.NODE_ENV !== 'production'){
    config();
}

export const configuration = {
    'dev': {
        'aws_region': process.env.AWS_REGION,
        'aws_profile': process.env.AWS_PROFILE,
        'games_table': process.env.GAMES_TABLE,
        'aws_media_bucket': process.env.AWS_MEDIA_BUCKET,
        'aws_access_key_id': process.env.AWS_ACCESS_KEY_ID,
        'aws_secret_access_key': process.env.AWS_SECRET_ACCESS_KEY
    }
}