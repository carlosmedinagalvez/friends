import express from 'express'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
const router = express.Router()

router.get('/users', async (req, res, next) => {

    const client = new S3Client({
        region: "us-east-1",
        // You might need to configure credentials here if not using environment variables or IAM roles
    });
    const expiresInSeconds = 360;

    const command = new GetObjectCommand({
        Bucket: 'friendsfiles',
        Key: 'Oliver.jpg',
        Fields: {
            'content-type': 'text/plain',
        },
    });

    try {
        const signedUrl = await getSignedUrl(client, command, {
            expiresIn: expiresInSeconds,
        });
        res.json({ url: signedUrl});
    } catch (error) {
        console.error("Error generating presigned POST:", error);
    }
  });
export default router