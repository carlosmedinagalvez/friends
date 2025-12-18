import axios from 'axios';

const uploadFile = async (file) => {
    try {
        // 1. Get the pre-signed URL from your backend API
        const response = await axios.post('/api/get-s3-signed-url', {
            fileName: file.name,
            fileType: file.type,
        });
        const { uploadUrl } = response.data;

        // 2. Upload the file directly to S3 using the pre-signed URL
        await axios.put(uploadUrl, file, {
            headers: {
                'Content-Type': file.type, // Must match the ContentType used to generate the URL
            },
            onUploadProgress: (progressEvent) => {
                // Optional: track upload progress
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log(`Upload progress: ${percentCompleted}%`);
            },
        });

        console.log('File successfully uploaded to S3!');
    } catch (error) {
        console.error('Error uploading file:', error);
    }
};

// Example usage (e.g., from an input change event handler):
 const handleFileInputChange = (event) => {
   const file = event.target.files[0];
   if (file) {
     uploadFile(file);
   }
 };
