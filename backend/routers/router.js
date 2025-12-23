import express from 'express'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
const router = express.Router()

router.post('/users', async (req, res, next) => {

    const client = new S3Client({
        region: "us-east-1",
        signatureVersion: "v4",
        // You might need to configure credentials here if not using environment variables or IAM roles
    });
    const expiresInSeconds = 360;
    const { fileName, fileType } = req.body;
    console.log(`file NAME: ${fileName}`);
    const command = new PutObjectCommand({
        Bucket: 'friendsfiles',
        Key: fileName, //'Oliver.jpg',
        ContentType: "image/jpeg",
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