import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Route, useParams, Link, useHistory } from "react-router-dom";
import { useDispatch} from "react-redux";
import './single.css'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
const AWS = require('aws-sdk')
const {v4: uuidv4} = require('uuid')



const SingleUpload = () => {
    const [file, setFile] = useState(null)
    const uploadFile = async() => {
        const S3_Bucket = 'charlesawsbucketaudio'
        const REGION = 'us-east-2'
        AWS.config.update({
            accessKeyId: 'AKIATADEPAPDAJRF6XPC',
            secretAccessKey: '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'
        })
        const s3 = new AWS.S3({
            params: { Bucket: S3_Bucket},
            region: REGION
        })

        const params = {
            Bucket: S3_Bucket,
            Key: uuidv4(),
            Body: file,
            ContentType: 'audio/mpeg',
            ACL: 'public-read'
        }

        let upload = s3
            .putObject(params)
            .on("httpUploadProgress", (evt) => {
                console.log("Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%")
            })
            .promise()

        await upload.then((err, data) => {
            console.log(err)
            alert('file upload successful')
        })
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setFile(file)
    }



    return (
        <div className="colliflower">
            <div>
                <input type='file'  onChange={handleFileChange} accept='audio/mp3'></input>
                <button onClick={uploadFile}>Upload</button>
            </div>

            <div>
                <AudioPlayer
                src="https://charlesawsbucketaudio.s3.us-east-2.amazonaws.com/1b8f0291-d6ae-4433-8492-e6c79844b180"
                />
            </div>
        </div>

    )

}
export default SingleUpload
