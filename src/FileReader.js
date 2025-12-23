import fs from 'fs';
export function getFile(file) {
    console.log(`FILE = ${file}`);
    try {
        const data = fs.readFileSync(file)
        return data;
    } catch (error) {
        console.err(error);
    }
}

export default FileReader;
