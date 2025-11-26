export async function uploadFile(bucketName: string, filePath: string, mimeType: string){
    try{
        const {url, fields} = await getPresignedPostData(bucketName, filePAth,mimeType);
        const formData = Object.entries(fields).reduce((data, [key,valeu]) => {
            data.append(key,value);
            return data;
        }, new FormData());
        const buf = await readFile(filePath);

        formData.append('file', new Blob([buf]));

        return await axios.post(url, formData)
    } catch (e){
        throw new Erro(`file(${filePAth}) upload failed: ${e}`);
    }
}

/*function bucketKey(fullPath: string): string {
    let idx: number;
    idx = fullPath.lastIndexOf('/');
    if(idx === -1)
      idx = fullPath.lastIndexOf('\\');
    if(idx === -1)
      return fullPath;
    return fullPath.substring(idx + 1);
}

type ResourceOptions = {
    region: string,
    credentials: AwsCredentialIdentityProvider
}

function getResource<T>(factory : (options: ResourceOptions) => T, additionalOptions?: object): T{
    const defaultOpts = {
        region:process.envAWS_REGION as string,
        credentials: defaultProvider()
    }
    additionalOptions = additionalOptions || {};
    const allOpts = {...defaultOpts, ...additionalOptions};
    return factoty(allOpts);
}

const getS3: (additionalOptions?: object) => S3Client = (additionalOptions) => getResource(options => new S3Client(options), additionsOptions);
*/
//test it
(async() => {
    const ret = await uploadFile('some-bucket','path-to-some-JPEG-image', 'image/jpeg');
    console.log(ret.date);
})();