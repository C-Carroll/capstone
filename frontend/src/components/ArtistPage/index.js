import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Route, useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./ArtistPage.css";
import { getArtist, updateArtist, removeArtist } from "../../store/artist";
import { getArtistAlbums } from "../../store/music";
import AlbumPageContent from "../AlbumPageContent";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
import EditProfileModal from "../EditProfileModal";
import DeleteArtistModal from "../DeleteArtistModal";

const ArtistPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { artistId } = useParams();
  const artist = useSelector((state) => state.artist.artist);
  const albums = useSelector((state) => state.music.artistAlbums.Albums);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getArtist(artistId));
    dispatch(getArtistAlbums(artistId));
  }, [dispatch, artistId]);

  const editButt = (artistId) => {
    if (user.id === artist.userId) {
      return (
        <div className="butCotn">
          <div className="editButtButton">
            <OpenModalButton
              buttonText="Edit Profile"
              modalComponent={<EditProfileModal artist={artist} />}
            />
          </div>
          <div className="editButtDelete">
            <OpenModalButton
              buttonText="Delete Profile"
              modalComponent={<DeleteArtistModal user={user} />}
            />
          </div>
        </div>
      );
    }
  };

  const addButt = () => {
    if (user.id === artist.userId) {
      return (
        <div
          id="addbutton"
          onClick={() => {
            newAlb();
          }}
        >
          <i class="fa-solid fa-circle-plus"></i>
          <div>Album</div>
        </div>
      );
    }
  };

  const newAlb = () => {
    history.push("/newAlbum");
  };

  if (!user) return history.push("/");
  else
    return (
      <div className="artistPageContainer">
        {user ? (
          <div>
            {artist ? (
              <div>
                <div className="artPHead">
                  {user && artist && editButt(artist.id)}
                  <h1>{artist.name}</h1>
                  <div className="aphDesc">{artist.description} *</div>
                </div>
                <div className="artpbHead">
                  <div id="albumss">Albums:</div>
                  {/* <div id='addbutton' >
                                <i class="fa-solid fa-circle-plus"></i>
                                <div>Album</div>
                            </div> */}
                  {user && artist && addButt()}
                </div>
                <div className="artPBody">
                  {albums && albums.length > 0 ? (
                    albums.map((album) => (
                      <div className="apbAlbum">
                        <Link
                          key={album.id}
                          to={`/albums/${album.id}`}
                          className="apbLink"
                        >
                          <div className="apbAlbumPic">
                            <img
                              className="apbAP"
                              src={album.albumPicture}
                              alt={`Picture of ${album.albumName} cover art`}
                            />
                          </div>
                          <div className="apbAlbumInfo">{album.albumName}</div>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <h4>Artist currently has no Albums</h4>
                  )}
                </div>
              </div>
            ) : (
              <h3>No Artist</h3>
            )}
          </div>
        ) : (
          <h3>Please log in</h3>
        )}
      </div>
    );
};

export default ArtistPage;
