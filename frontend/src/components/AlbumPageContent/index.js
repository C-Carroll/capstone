import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Route, useParams } from "react-router-dom";
import { useDispatch} from "react-redux";
import './APContent.css'


const AlbumPageContent = ({song}) => {

    const urlMaker = (url) => {
        if(url.split('=')[0].endsWith('watch?v')){
            return `https://www.youtube.com/embed/${url.split('=')[1]}`
        } else if(url.split('=')[0].endsWith('?si')){
            return `https://www.youtube.com/embed/${(url.split('=')[0].split('?')[0].split('/').slice(-1))}`
        }
    }

    return(
        <div className= "APCContainer">
            <div className="APVideo">
                <iframe src={urlMaker(song.songUrl)} allowFullScreen></iframe>

            </div>
            <div className="APSongInfo">
                {song.songName}
            </div>
        </div>
    )
}

export default AlbumPageContent
