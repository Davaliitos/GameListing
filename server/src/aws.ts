import AWS from 'aws-sdk'
import { configuration } from './config/config';

const c = configuration.dev;
const credentials = new AWS.Credentials({
    accessKeyId: c.aws_access_key_id,
    secretAccessKey: c.aws_secret_access_key
});
AWS.config.credentials = credentials;

export const s3 = new AWS.S3({
    signatureVersion: 'v4',
    region: c.aws_region,
    params: {
        Bucket: c.aws_media_bucket
    }
})

/* getPutSignedUrl generates an aws signed url to put an item
 * @Params
 *    key: string - the filename to be retreived from s3 bucket
 * @Returns:
 *    a url as a string
 */

export function getPutSignedUrl(key: String) {
    const signedUrlExpireSeconds = 60 * 5;

    const url = s3.getSignedUrl('putObject', {
        Bucket: c.aws_media_bucket,
        Key: key,
        Expires: signedUrlExpireSeconds
    })

    return url;
}

export function getGetSignedUrl(key: String){

    const signedUrlExpireSeconds = 60*5;
    
    const url = s3.getSignedUrl('getObject', {
        Bucket: c.aws_media_bucket,
        Key: key,
        Expires: signedUrlExpireSeconds
    })
    return url
}