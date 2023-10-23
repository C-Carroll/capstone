import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Route, useParams, Link } from "react-router-dom";
import { useDispatch} from "react-redux";
import './AlbumBrowser.css'
import { getAlbums } from "../../store/music";


const AlbumBrowser = () => {
    const dispatch = useDispatch()
    const albums = useSelector((state) => state.music.albums.Albums)
    console.log(albums)

    useEffect(() => {
        dispatch(getAlbums())
    }, [dispatch])

    return(
        <div className="abContainer">
            <div className='abHeader'>
                <h1>Explore</h1>
            </div>
            <div className="abAlbumsContainer">
                {albums ? (
                    albums.map((album) => (

                        <div className='abAlbum dropdown' title={album.albumName}>
                            <Link key={album.id} to={`/albums/${album.id}`} className="albumLink">
                            <div className='abAlbumPic'>
                                <img className="abImg" src={album.albumPicture} alt={`Picture of ${album.albumName} cover art`}/>
                            </div>
                            </Link>
                            <div className="abAlbumInfo">
                                <Link key={album.id} to={`/albums/${album.id}`} className="albumLink">
                                    <div className="abInfoName">{album.albumName}</div>
                                </Link>
                                <Link key={album.artistId} to={`/artist/${album.artistId}`} className="artistLink">
                                    <div className="abInfoArtist">{album.Artist.name}</div>
                                </Link>
                            </div>
                        </div>

                    ))
                )
                : <h3>currently no music</h3>}
            </div>
        </div>
    )
}

export default AlbumBrowser
