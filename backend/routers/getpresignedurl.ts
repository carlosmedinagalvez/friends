import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
//import { createPresignedPost } from '@aws-sdk/s3-presigned-post'
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";

// Initialize S3 Client
export const client = new S3Client({
  region: "us-east-1", // Replace with your desired AWS region
  // You might need to configure credentials here if not using environment variables or IAM roles
});

export async function generatePresignedPost(bucketName, objectKey, expiresInSeconds = 3600) {

    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: objectKey,
        Fields: {
          'content-type': 'text/plain', // this field must be present in the client request
        },
    });

  try {
    const url = await getSignedUrl(client, command, {
        expiresIn: expiresInSeconds, 
    });

    //console.log("Presigned URL:", url);
    return url;

  } catch (error) {
    console.error("Error generating presigned POST:", error);
  }
}
//generatePresignedPost();
//export default generatePresignedPost;
//module.exports = getpresignedurl