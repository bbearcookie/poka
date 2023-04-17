import { s3, Bucket } from '@config/s3';
import { DeleteObjectCommand, PutObjectCommand, PutObjectRequest } from '@aws-sdk/client-s3';

// S3에 파일 업로드
export async function putFile(params: { Key: string; Body: PutObjectRequest['Body'] | string | Uint8Array | Buffer }) {
  try {
    await s3.send(new PutObjectCommand({ Bucket, ...params }));
  } catch (err) {
    console.error(err);
  }
}

// S3에서 파일 삭제
export async function deleteFile(params: { Key: string }) {
  try {
    await s3.send(new DeleteObjectCommand({ Bucket, ...params }));
  } catch (err) {
    console.error(err);
  }
}
