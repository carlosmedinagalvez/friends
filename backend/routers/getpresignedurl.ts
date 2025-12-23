import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
//import { createPresignedPost } from '@aws-sdk/s3-presigned-post'
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";

// Initialize S3 Client
export const client = new S3Client({
  region: "us-east-1", // Replace with your desired AWS region
  // You might need to configure credentials here if not using environment variables or IAM roles
});

export async function generatePresignedPost(fileName, fileType) {
    console.log(`file type: ${fileType}`);
    const command = new PutObjectCommand({
        Bucket: 'friendsfiles',
        Key: fileName,
        ContentType: fileType,
    });

    try {
        const url = await getSignedUrl(client, command, {
            expiresIn: 180, 
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