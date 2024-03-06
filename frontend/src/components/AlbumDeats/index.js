import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Route, useParams, Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./AlbumDeats.css";
import { getAlbum, getSongsOnAlbum } from "../../store/music";
import AlbumPageContent from "../AlbumPageContent";
import ReviewComponet from "../ReviewsComp";

const AlbumsDeatsPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { albumId } = useParams();
  const album = useSelector((state) => state.music.album);
  const songs = useSelector((state) => state.music.songs.Songs);
  const user = useSelector((state) => state.session.user);
  console.log(album);

  const [toggleState, setToggleState] = useState(1);

  useEffect(() => {
    dispatch(getAlbum(albumId));
    dispatch(getSongsOnAlbum(albumId));
  }, [dispatch, albumId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const toggleTab = (id) => {
    setToggleState(id);
  };
  useEffect(() => {
    if (songs) {
      setToggleState(songs[0].id);
    }
  }, [songs, setToggleState]);

  if (!user) return history.push("/");
  else
    return (
      <div className="albumDPageContainer">
        <div className="albumDPageMainContainer">
          <div className="albumDPage-leftCol">
            <div className="aInfo"></div>
            <div className="aSongs">
              {songs ? (
                songs.map((song) => (
                  <div
                    className={
                      toggleState === song.id ? "tabs active-tab" : "tabs"
                    }
                    onClick={() => toggleTab(song.id)}
                  >
                    {song.songName}
                  </div>
                ))
              ) : (
                <h3>album has no songs</h3>
              )}
            </div>
          </div>

          <div className="albumDPage-center">
            {songs && album ? (
              songs.map((song) => (
                <div
                  className={
                    toggleState === song.id
                      ? "scontent active-scontent"
                      : "scontent"
                  }
                >
                  <AlbumPageContent song={song} pic={album.albumPicture} />
                </div>
              ))
            ) : (
              <div>... loading</div>
            )}
          </div>

          <div className="albumDPage-rightCol">RIGHT</div>
        </div>

        <div className="albumDPage-revs"></div>
      </div>
    );
};

export default AlbumsDeatsPage;
