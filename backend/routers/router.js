import express from 'express'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getFile } from './ReaderFile.js';

const router = express.Router()

router.get('/users', async (req, res, next) => {

    const client = new S3Client({
        region: "us-east-1",
        signatureVersion: "v4",
        // You might need to configure credentials here if not using environment variables or IAM roles
    });
    const expiresInSeconds = 360;
    const { filename, filetype } = req.query;
    //const filename = req.query.filename;  //new
    //const filetype = req.query.filetype;  //new
    console.log(`file NAME: ${filename}`);
    console.log(`file type: ${filetype}`);
    const command = new PutObjectCommand({
        Bucket: 'friendsfiles',
        Key: filename, //'Oliver.jpg',
        ContentType: "image/jpeg",
        AccessKeyId: "",
        SecretAccessKey: "",
    });

    try {
        const signedUrl = await getSignedUrl(client, command, {
            //signableHeaders: new Set(["content-type"]),
            expiresIn: expiresInSeconds,
        });
        res.json({ url: signedUrl});
    } catch (error) {
        console.error("Error generating presigned POST:", error);
    }
});

router.get('/fetfile', async (req, res) => {
    const { filepath, filename, filetype } = req.query;
    console.log(`PATH = ${filePath}`);
    const strm = getFile(fileName, filePath);
    res.send(strm);
})
export default router