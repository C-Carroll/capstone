const AWS = require("aws-sdk");
const addSong = async (uid, file) => {
  // const [file, setFile] = useState(null)

  const uploadFile = async () => {
    const S3_Bucket = "charlesawsbucketaudio";
    const REGION = "us-east-2";
    AWS.config.update({
      accessKeyId: process.env.REACT_APP_AWSKEY,
      secretAccessKey: process.env.REACT_APP_AWSSEC,
    });
    const s3 = new AWS.S3({
      params: { Bucket: S3_Bucket },
      region: REGION,
    });

    const params = {
      Bucket: S3_Bucket,
      Key: uid,
      Body: file,
      ContentType: "audio/mpeg",
      ACL: "public-read",
    };

    let upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        console.log(
          "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%" + uid
        );
      })
      .promise();

    await upload.then((err, data) => {
      console.log(err);
      alert("file upload successful");
    });
  };

  uploadFile();
  return "success";
};
export default addSong;
