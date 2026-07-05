import imagekit from "@imagekit/javascript";

const imagekitConfig=new imagekit({
    PublicKey:process.env.IMAGEKIT_PUBLIC_KEY,
    PrivateKey:process.env.IMAGEKIT_PRIVATE_KEY,
    UrlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT
})

export default imagekitConfig