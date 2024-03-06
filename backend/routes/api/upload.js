const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");
const multer = require("multer");
const { memoryStorage } = require("multer");
const storage = memoryStorage();
const upload = multer({ storage });
const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWSKEY,
  secretAccessKey: process.env.AWSSEC,
});

const uploadAudio = (filename, bucketname, file) => {
  return new Promise((resolve, reject) => {
    const params = {
      Key: filename,
      Bucket: bucketname,
      Body: file,
      ContentType: "audio/mpeg",
      ACL: "public-read",
    };

    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const bucket = "charlesawsbucketaudio";

router.post("/upload", upload.single("audiofile"), async (req, res) => {
  const filename = uuidv4();
  const bucketname = "charlesawsbucketaudio";
  const file = req.file.buffer;

  const link = await uploadAudio(filename, bucketname, file);

  res.send("upload successful");
});

module.exports = router;
