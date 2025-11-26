/*import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({ region: "us-east-1" });

async function getS3PresignedUrl(bucketName: string, key: string) {
    const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // URL valid for 1 hour
    return url;
}
console.log('hola mundo!');
export default getS3PresignedUrl;*/

import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

// Initialize S3 Client
const client = new S3Client({
  region: "us-east-1", // Replace with your desired AWS region
  // You might need to configure credentials here if not using environment variables or IAM roles
});

async function generatePresignedPost() {
  const bucketName = "friendsfiles"; // Replace with your S3 bucket name
  const objectKey = "Oliver.jpg"; // The key (path) of the object in S3
  const expirationInSeconds = 60; // 1 hour 3600

  try {
    const { url, fields } = await createPresignedPost(client, {
      Bucket: bucketName,
      Key: objectKey,
      Conditions: [
        // Optional: Add conditions for the upload
        { bucket: bucketName }, // Ensure the upload is to the specified bucket
        ["starts-with", "$key", "uploads/"], // Ensure the key starts with 'uploads/'
        ["content-length-range", 0, 10485760], // Max file size of 10MB
        // You can add more conditions like 'acl', 'content-type', 'success_action_redirect', etc.
      ],
      Expires: expirationInSeconds,
    });

    console.log("Presigned POST URL:", url);
    console.log("Form Fields:", fields);

    // You would then send 'url' and 'fields' to your client-side application
    // to construct an HTML form and perform the upload.
    // Example client-side HTML form structure:
    /*
    <form action="${url}" method="POST" enctype="multipart/form-data">
      <input type="hidden" name="key" value="${fields.key}" />
      <input type="hidden" name="AWSAccessKeyId" value="${fields.AWSAccessKeyId}" />
      <input type="hidden" name="policy" value="${fields.policy}" />
      <input type="hidden" name="signature" value="${fields.signature}" />
      <!-- Add other hidden fields from 'fields' object as needed -->
      <input type="file" name="file" />
      <button type="submit">Upload</button>
    </form>
    */

  } catch (error) {
    console.error("Error generating presigned POST:", error);
  }
}

generatePresignedPost();