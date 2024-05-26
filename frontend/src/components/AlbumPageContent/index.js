import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Route, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./APContent.css";
import AudioPlayer from "react-h5-audio-player";

const AlbumPageContent = ({ song, pic }) => {
  const audUrl = `${process.env.REACT_APP_AWSURL}${song.uid}`;
  const urlMaker = (url) => {
    if (url.split("=")[0].endsWith("watch?v")) {
      return `https://www.youtube.com/embed/${url.split("=")[1]}`;
    } else if (url.split("=")[0].endsWith("?si")) {
      return `https://www.youtube.com/embed/${url
        .split("=")[0]
        .split("?")[0]
        .split("/")
        .slice(-1)}`;
    } else if (url.split("=")[0].endsWith("feature")) {
      return `https://www.youtube.com/embed/${url
        .split("=")[0]
        .split("?")[0]
        .split("/")
        .slice(-1)}`;
    }
  };

  return (
    <div>
      {song && (
        <div className="APCContainer">
          <div className="APVideo">
            {/* <iframe src={urlMaker(song.songUrl)} allowFullScreen></iframe> */}
            {song.songUrl ? (
              <iframe src={urlMaker(song.songUrl)} allowFullScreen></iframe>
            ) : (
              <div>
                <img
                  className="noVidPic"
                  src={pic}
                  alt={`Picture of  cover art`}
                />{" "}
              </div>
            )}
          </div>
          <div className="APSongInfo">
            <div>{song.songName}</div>
            {song.uid ? (
              <AudioPlayer
                autoPlay={false}
                autoPlayAfterSrcChange={false}
                src={`${process.env.REACT_APP_AWSURL}${song.uid}`}
                className="audPlay"
              />
            ) : (
              <div>No mp3 available</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumPageContent;
