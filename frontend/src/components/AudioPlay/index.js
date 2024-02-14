
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';




const AudioPlay = async(key) => {

    const url = `${process.env.REACT_APP_AWSURL}16896eca-94fe-435e-b264-aacf9b74f0de`

    return (
        <div className="audioPlayer">

            <div>
                <AudioPlayer
                src= "https://charlesawsbucketaudio.s3.us-east-2.amazonaws.com/16896eca-94fe-435e-b264-aacf9b74f0de"
                />
            </div>
        </div>

    )

}
export default AudioPlay
