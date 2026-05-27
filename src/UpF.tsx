import { useState, useEffect } from 'react';
import axios from 'axios';
import AWS from 'aws-sdk'; // Import global AWS namespace (recommended)
//import { PutObjectCommand } from "@aws-sdk/client-s3";
//import dotenv from 'dotenv';

export const S3_BUCKET = 'friendsfiles'; // Replace with your S3 bucket name
export const AWS_DEFAULT_REGION = 'us-east-1'; // Replace with your AWS region
export const AWS_SDK_LOAD_CONFIG = '1';
export const AWS_ACCESS_KEY_ID = '';
export const AWS_SECRET_ACCESS_KEY = '';
//dotenv.config();

// Configure AWS SDK
AWS.config.update({
    accessKeyId: '', // Replace with your AWS Access Key ID
    secretAccessKey: '', // Replace with your AWS Secret Access Key
});
const s3 = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: AWS_DEFAULT_REGION,
    signatureVersion: "v4",
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

function UpF() {
    //const [data, setData] = useState<any>();
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            console.log(e.target.files[0]);
        }
    };
    /*const client = new S3Client({
        region: "us-east-1",
        credentials: {
            accessKeyId: "",
            secretAccessKey: "",
        },
    });*/

    useEffect(() => {
        const uploadFile = async () => {
            if (!file) return;
            setUploading(true);
            setError(null);

            const params = {
                Bucket: S3_BUCKET,
                Key: file.name,  // The name of the file in S3
                Body: file,
                ContentType: 'image/jpeg',//selectedFile.type, // The content type of the file
            };
            //const command = new PutObjectCommand(params);


            try {

                const response = await axios.get('http://localhost:4000/users')
                //setData(response.data);
                console.log(response.data);

                if (response==null) throw new Error('Failed to get presigned URL');

                const { url } = await response.data;
                console.log(url);

                // Step 2
                /*const uploadResponse = await fetch(url, { //forbidden 
                    method: 'PUT',
                    headers: { 'Content-Type': file.type },
                    body: file,
                });
                console.log(uploadResponse);*/
                /*const uploadResponse = await axios.put(url,file,{ // 403 forbidden
                    method: 'PUT',
                    headers: { 'Content-Type': file.type }
                });
                if (!uploadResponse.ok) throw new Error('Failed to upload file to S3')*/

                try {
                    //await s3.putObject(params);  // NO DA ERROR
                    await s3.putObject(params).promise();  // CredentialsError: missing credentials
                    // const response = await client.send(command); //TypeError: readableStream.getReader is not a function
                    //console.log(response);
                } catch (err) {
                    console.error('Error uploading file:', err);
                    setError('Error uploading file. Please try again.');
                } finally {
                    setUploading(false);
                }

                alert('File uploaded successfully!');
                setFile(null);
            } catch (err: any) {
                setError(err.message || 'An error occurred during upload');
            } finally {
                setUploading(false);
            }
        };

        uploadFile();
    }, [file]);

    return (
        <div>
            <h2>Upload Image to S3</h2>
            <input type="file" onChange={handleFileChange} accept="image/*" disabled={uploading} />
            {uploading && <p>Uploading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default UpF;