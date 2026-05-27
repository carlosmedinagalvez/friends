import fs from 'fs';
export function getFile(file, path) {
    console.log(`FILE = ${file}`);
    console.log(`PATH = ${path}`);
    try {
        const data = fs.readFileSync(file)
        return data;
    } catch (error) {
        console.error(error);
    }
}

//export default ReaderFile;
