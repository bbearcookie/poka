import { s3, Bucket } from '@config/s3';
import { DeleteObjectCommand, PutObjectCommand, PutObjectRequest } from '@aws-sdk/client-s3';

// S3에 파일 업로드
export function putFile(params: { Key: string; Body: PutObjectRequest['Body'] | string | Uint8Array | Buffer }) {
  return s3.send(new PutObjectCommand({ Bucket, ...params }));
}

// S3에서 파일 삭제
export function deleteFile(params: { Key: string }) {
  return s3.send(new DeleteObjectCommand({ Bucket, ...params }));
}
