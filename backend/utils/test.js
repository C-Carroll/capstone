
const aws = require('aws-sdk')
const crypto = require('crypto')
const { promisify } = require('util')
const randomBytes = promisify(crypto.randomBytes)


const region = 'us-east-2'
const bucketName = 'charlesawsphotos'
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'

})

 async function genUploadURL(){
    const rawBytes = await randomBytes(16)
    const imageName = rawBytes.toString('hex')

    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 60

    })
    const uploadURL = await s3.getSignedUrlPromise('putObject', params)
    console.log(uploadURL)
    return uploadURL
}
module.exports = { genUploadURL }
