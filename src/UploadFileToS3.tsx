import React, { useState } from 'react';
import AWS from 'aws-sdk'; // Import the AWS SDK

export const S3_BUCKET = 'friendsfiles'; // Replace with your S3 bucket name
export const REGION = 'us-east-1'; // Replace with your AWS region

// Configure AWS SDK
AWS.config.update({
    accessKeyId: 'xxx', // Replace with your AWS Access Key ID
    secretAccessKey: 'xx', // Replace with your AWS Secret Access Key
});

const s3 = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
});

function ImageUpload() {
    const [selectedFile, setSelectedFile] = useState<HTMLInputElement | null>();
    const [uploading, setUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [error, setError] = useState<string>();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFile(event.target);
        setUploadSuccess(false);
        setError('');
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Please select a file to upload.');
            return;
        }

        setUploading(true);
        setError('');
        setUploadSuccess(false);

        const params = {
            Bucket: S3_BUCKET,
            Key: selectedFile.value, // The name of the file in S3
            Body: selectedFile.value, // The file itself
            ContentType: 'image/jpg',//selectedFile.type, // The content type of the file
        };

        try {
            //s3.putObject(params);
            await s3.upload(params).promise(); 
            setUploadSuccess(true);
            setSelectedFile(null); // Clear the selected file after successful upload
        } catch (err) {
            console.error('Error uploading file:', err);
            setError('Error uploading file. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <h2>Upload Image to S3</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={!selectedFile || uploading}>
                {uploading ? 'Uploading...' : 'Upload Image'}
            </button>

            {uploadSuccess && <p style={{ color: 'green' }}>Image uploaded successfully!</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default ImageUpload;