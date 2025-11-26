import { useState, useEffect } from 'react';
import Foto from "./Oliver.jpg";
function Home() {
    const [data, setData] = useState<string | undefined>();
    const [error, setError] = useState<string | null>('');
    const [loading, setLoading] = useState(false);
    //const [err, setErr] = useState<unknown | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://media.themoviedb.org/t/p/w300_and_h450_bestv2/qShQABLVRMZKnv5mWOPXWniBeB3.jpg', { method: 'GET' });
                if (!response.ok) {
                    setError('error');
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.blob();
                const resultado = URL.createObjectURL(result);
                setData(resultado);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    console.error("An error occurred:", err.message);
                } else {
                    console.error("An unknown error occurred:", err);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs once on mount
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    //const objectURL = URL.createObjectURL(data);

    return (
        <div>
            <img src={data} width="100%" height="100%" />
            <img src={Foto} width="25%"  height="25%" />
        </div>
    );
}
export default Home;