import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Route, useParams, Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./AlbumPage.css";
import { getAlbum, getSongsOnAlbum } from "../../store/music";
import AlbumPageContent from "../AlbumPageContent";
import ReviewComponet from "../ReviewsComp";
import LoadingPage from "../LoadingScreen";

const AlbumsPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { albumId } = useParams();
  const album = useSelector((state) => state.music.album);
  const songs = useSelector((state) => state.music.songs.Songs);
  const user = useSelector((state) => state.session.user);

  const [isLoading, setIsLoading] = useState(true);
  const [toggleState, setToggleState] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  });
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
      <div>
        {isLoading === true ? (
          <LoadingPage />
        ) : (
          album &&
          songs && (
            <div className="apContainer">
              <div className="apHeader">
                <div className="aph1">
                  <div className="apAlbumName">{album.albumName}</div>
                  <div className="apBandName">
                    <Link
                      key="album.artistId"
                      to={`/artist/${album.artistId}`}
                      className="apArtistLink"
                    >
                      {album.Artist.name}
                    </Link>
                  </div>
                </div>
                <div className="apAlbumRating">
                  <i className="fa-star fa-solid filled"></i>
                  {!album.albumRating || isNaN(album.albumRating) ? (
                    <>No Reviews</>
                  ) : (
                    album.albumRating
                  )}
                </div>
              </div>
              <div className="apMain">
                <div className="apMainTabs">
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
                <div className="apMainContent">
                  {songs ? (
                    songs.map((song) => (
                      <div
                        className={
                          toggleState === song.id
                            ? "content active-content"
                            : "content"
                        }
                      >
                        <AlbumPageContent
                          song={song}
                          pic={album.albumPicture}
                        />
                      </div>
                    ))
                  ) : (
                    <div>... loading</div>
                  )}
                </div>
              </div>
              <div className="APRevs">
                <ReviewComponet album={album} />
              </div>
            </div>
          )
        )}
      </div>
    );
};

export default AlbumsPage;
