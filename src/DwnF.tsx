import { useEffect, useState } from 'react';
import axios from 'axios';
const apiUrl = import.meta.env.AWS_REGION;

console.log(apiUrl);

function DwnF() {
    const [fotos, setFotos] = useState<any>();
    useEffect(() => {
        axios.get('/api/users')
            .then((res) => setFotos(res.data));
        
    }, []);
    console.log("------");
    console.log(fotos);

    return (
        <div>
            <label>{apiUrl}</label>
        </div>
    )
}

export default DwnF;
