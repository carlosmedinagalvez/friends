import axios from 'axios';

async function downloadFileFromS3(presignedUrl: string) {
    try {
        const response = await axios.get(presignedUrl, {
            responseType: 'arraybuffer', // Important for binary files
        });

        // 'response.data' will be an ArrayBuffer containing the file content
        // You can then process this data, e.g., create a Blob and trigger a download
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'your-file-name.ext'; // Set desired filename
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        console.log('File downloaded successfully!');
    } catch (error) {
        console.error('Error downloading file:', error);
    }
}
export default downloadFileFromS3;
// Example usage (assuming you have a presignedUrl)
// downloadFileFromS3(yourPresignedUrl);