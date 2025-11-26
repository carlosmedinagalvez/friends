import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

// Initialize S3 Client
export const client = new S3Client({
  region: "us-east-1", // Replace with your desired AWS region
  // You might need to configure credentials here if not using environment variables or IAM roles
});

export async function generatePresignedPost() {
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

  } catch (error) {
    console.error("Error generating presigned POST:", error);
  }
}
//generatePresignedPost();
export default generatePresignedPost;
//module.exports = getpresignedurl