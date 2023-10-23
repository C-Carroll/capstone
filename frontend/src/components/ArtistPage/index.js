import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Route, useParams } from "react-router-dom";
import { useDispatch} from "react-redux";
import './ArtistPage.css'
import { getArtist, updateArtist, removeArtist } from "../../store/artist";
import { getArtistAlbums } from "../../store/music";
import AlbumPageContent from "../AlbumPageContent";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ArtistPage = () => {
    const dispatch = useDispatch()
    const { artistId } = useParams()
    const artist = useSelector((state) => state.artist.artist)
    const albums = useSelector((state) => state.music.artistAlbums.Albums)
    console.log(artist)
    console.log(albums)

    useEffect(() => {
        dispatch(getArtist(artistId))
        dispatch(getArtistAlbums(artistId))
    }, [dispatch])


    return (
        <div className="artistPageContainer">
            {artist ?
            <div>
                <div className='artPHead'>
                    <h1>{artist.name}</h1>
                    <div className="aphDesc">
                        {artist.description} *
                    </div>
                </div>
                <div className="artPBody">
                    {albums && albums.length > 0 ? (albums.map((album) => (
                        <div className="apbAlbum">
                            <Link key={album.id} to={`/albums/${album.id}`} className='apbLink'>
                                <div className="apbAlbumPic">
                                    <img className="apbAP" src={album.albumPicture} alt={`Picture of ${album.albumName} cover art`} />
                                </div>
                                <div className="apbAlbumInfo">
                                    {album.albumName}
                                </div>
                            </Link>
                        </div>
                    )))
                    :<h4>Artist currently has no Albums</h4>}
                </div>
            </div>
            :<h3>No Artist</h3>}
        </div>
    )
}

export default ArtistPage
