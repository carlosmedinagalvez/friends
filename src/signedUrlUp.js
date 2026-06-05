import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3Client from "./s3Client";

const putObjectCommand = async (filename, contentType) => {
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        key: `/uploads/${filename}`,
        ContentType: contentType,
    });
    return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
};

export default putObjectCommand;