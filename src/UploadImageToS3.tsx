import axios from 'axios';
import React, { useState } from 'react';
import {getFile} from './FileReader.js';

//const fs = require('fs');
async function uploadFile(file) {

    try {
        // 1. Get the pre-signed URL from your backend API
        console.log(file.split('\\').pop());
        const response = await axios.post('http://localhost:4000/users', {
            fileName: file.split('\\').pop(),
            fileType: "image/jpeg", //file.type,
        });
        const { uploadUrl } = response.data;
        console.log(response);
        console.log(response.data["url"]);

        const theFile = getFile(setFilePath);
        // 2. Upload the file directly to S3 using the pre-signed URL
        console.log(uploadUrl);
        const fileData = theFile;
        await axios.put(response.data["url"], fileData, {
            headers: {
                'Content-Type': "image/jpg", // Must match the ContentType used to generate the URL
            },
            onUploadProgress: (progressEvent) => {
                // Optional: track upload progress
                const percentCompleted = Math.round((progressEvent.loaded * 100) / 1);
                console.log(`Upload progress: ${percentCompleted}%`);
            },
        });

        console.log('File successfully uploaded to S3!');
    } catch (error) {
        console.log('Error uploading file:', error);
    }
}



function UploadImageToS3() {
    //const [selectedFile, setSelectedFile] = useState<HTMLInputElement | null>();
    const [selectedFile, setSelectedFile] = useState('');
    const [uploading, setUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [error, setError] = useState<string>();
    const [filePath, setFilePath] = useState<string>();
    //const [signedUrl, setSignedUrl] = useState<string>();
    //const [fileUrl, setFileUrl] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(`file == ${event.target.files[0]}`);
        const ffile = event.target.files[0];
        //setFileUrl(URL.createObjectURL(ffile));
        setFilePath(URL.createObjectURL(ffile));
        setSelectedFile(event.target.value);
        setUploadSuccess(false);
        setError('');
    };
    // Example usage (e.g., from an input change event handler):
    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        //const file = event.target.value;
        if (selectedFile) {
            uploadFile(selectedFile);
        } else {
            console.error('no file');
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

export default UploadImageToS3;