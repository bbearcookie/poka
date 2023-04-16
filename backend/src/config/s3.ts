import { S3Client } from '@aws-sdk/client-s3';

export const s3 = new S3Client({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.AMAZONE_S3_ACCESS_KEY || '',
    secretAccessKey: process.env.AMAZONE_S3_PRIVATE_KEY || '',
  },
});

export const Bucket = process.env.AMAZONE_S3_BUCKET_NAME || '';
