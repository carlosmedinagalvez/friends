import React, { useState } from 'react';
// Uncomment one of the following import options:
//import AWS from 'aws-sdk'; // Import entire SDK (optional)
import AWS from 'aws-sdk/global'; // Import global AWS namespace (recommended)
import S3 from 'aws-sdk/clients/s3'; // Import only the S3 client

function UploadImages() {
    const [file, setFile] = useState<HTMLInputElement>();
    const [uploading, setUploading] = useState(false)

    const allowedTypes = [
        'image/jpg',
        'image/png',
        'application/pdf',
        'video/mp4',
        'video/quicktime',
        'audio/mpeg',
        'audio/wav',
        // Add more supported types as needed
    ];

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        //const selectedFile = event.target.files;
        console.log(event.target.files);
        if (allowedTypes.includes(event.target.type)) {
            setFile(event.target);
        } else {
            alert('Invalid file type. Only images and PDFs are allowed.');
        }
    };

    const uploadFile = async () => {
        setUploading(true)
        const S3_BUCKET = "friendsfiles"; // Replace with your bucket name
        const REGION = "us-east-1"; // Replace with your region

        AWS.config.update({
            accessKeyId: "",
            AccessKey: "",
        });

        const s3 = new S3({
            params: { Bucket: S3_BUCKET },
            region: REGION,
        });

        const params = {
            Bucket: S3_BUCKET,
            Key: file?.name,
            Body: file,
        };

        try {
            const upload = s3.createPresignedPost(params);
            console.log(upload);
            setUploading(false)
            alert("File uploaded successfully.");

        } catch (error) {
            console.error(error);
            setUploading(false)
            alert("Error uploading file: " + error); // Inform user about the error
        }
    };

    return (
        <>
            <div className="">
                <input type="file" required onChange={handleFileChange} />
                <button onClick={uploadFile}>{uploading ? 'Uploading...' : 'Upload File'}</button>
            </div>
        </>
    );
}

export default UploadImages;
