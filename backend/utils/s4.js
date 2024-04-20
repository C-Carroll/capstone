const aws = require("aws-sdk");

const region = 'us-east-2'
const bucketName = 'charlesawsbucketaudio'
const accessKeyId = process.env.AWSKEY
const secretAccessKey = process.env.AWSSEC

const s4 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})

async function generateUploadUrl(id){
    console.log(id)
    const audioName = id
    console.log(audioName)

    const params = {
        Bucket: bucketName,
        Key: audioName,
        Expires: 90
    }
    console.log(params)
    const uploadUrl = await s4.getSignedUrlPromise('putObject', params);
    return uploadUrl
}
module.exports = {generateUploadUrl}
