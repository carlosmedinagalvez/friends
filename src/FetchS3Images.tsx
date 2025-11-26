import React, { useState, useEffect } from 'react';
import axios from 'axios';

function S3BucketLister({ bucketName }) {
    const [s3Objects, setS3Objects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>();

    useEffect(() => {
        const fetchS3Objects = async () => {
            try {
                const response = await axios.get(`/api/s3-list/${bucketName}`); // Adjust API endpoint as needed
                setS3Objects(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchS3Objects();
    }, [bucketName]);

    if (loading) return <div>Loading S3 objects...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h2>Contents of {bucketName}:</h2>
            <ul>
                {s3Objects.map((key, index) => (
                    <li key={index}>{key}</li>
                ))}
            </ul>
        </div>
    );
}

export default S3BucketLister;