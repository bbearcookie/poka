import express from 'express';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3, Bucket } from '@config/s3';

const router = express.Router();

router.post('/file', async (req, res, next) => {
  const key = req.body.key;
  const content = req.body.content;

  try {
    const data = await s3.send(
      new PutObjectCommand({ Bucket, Key: 'test.txt', Body: 'This is test file by nodejs' })
    );
    return res.send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

export default router;
