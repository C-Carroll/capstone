import { csrfFetch } from "./csrf";

const ALBUMS = "albums/allAlbums"
const SINGLEALBUM = "album/singleAlbum"
const SONGS = "songs/songsOnAlbum"
const ARTIST_ALBUMS = "aAlbums/artistAlbums"

const allAlbums = (albums) => ({
    type: ALBUMS,
    payload: albums,
})

const singleAlbum = (album) => ({
    type: SINGLEALBUM,
    payload: album,
})

const songsOnAlbum = (songs) => ({
    type: SONGS,
    payload: songs
})

const artistAlbums = (aAlbums) => ({
    type: ARTIST_ALBUMS,
    payload: aAlbums
})


export const getAlbums = () => async (dispatch) => {
    const response = await csrfFetch("/api/music/");
    console.log(response)
    if(response.ok){
        const aList = await response.json()
        dispatch(allAlbums(aList))
        return response
    }
}

export const getAlbum = (albumId) => async (dispatch) => {
    const response = await csrfFetch(`/api/music/album/${albumId}`)
    console.log(response)
    if(response.ok){
        const album = await response.json()
        console.log(album)
        dispatch(singleAlbum(album))
        return response
    }
}

export const getSongsOnAlbum = (albumId) => async(dispatch) => {
    const response = await csrfFetch(`/api/music/album/songs/${albumId}`)
    console.log(response)
    if(response.ok){
        const songs = await response.json()
        dispatch(songsOnAlbum(songs))
        return response
    }
}

export const getArtistAlbums = (artistId) => async(dispatch) => {
    const response = await csrfFetch(`/api/music/artist/${artistId}`)
    if(response.ok){
        const albums = await response.json()
        console.log(albums)
        dispatch(artistAlbums(albums))
        return response
    }
}

export const makeNewAlbum = (album) => async(dispatch) => {
    const {albumName, albumPicture, albumPrice, isExplicit} = album;
    const response = await csrfFetch("/api/music/album/new", {
        method: "POST",
        body: JSON.stringify({
            albumName,
            albumPicture,
            albumPrice,
            isExplicit,
        })
    })
    if(response.ok){
        const newAlbum = await response.json()
        dispatch(singleAlbum(newAlbum))
        return newAlbum
    } else {throw new Error ('action failed')}
}

export const makeNewSong = (albumId, song) => async(dispatch) => {
    const { songName, price, songUrl, isExplicit } = song
    const response = await csrfFetch(`/api/music/song/${albumId}`, {
        method: "POST",
        body: JSON.stringify({
            songName,
            price,
            songUrl,
            isExplicit
        })
    })
    if(response.ok){
        const newSong = await response.json()
        dispatch(songsOnAlbum(newSong))
        return newSong
    }
}



const initialState = {
    albums: [],
    album: null,
    songs: [],
    artistAlbums: []
}

const musicReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALBUMS:
            return {
                ...state,
                albums: action.payload
        };
        case SINGLEALBUM:
            return {
                ...state,
                album: action.payload
        };
        case SONGS:
            return{
                ...state,
                songs: action.payload
        };
        case ARTIST_ALBUMS:
            return{
                ...state,
                artistAlbums: action.payload
            }

        default: return state
    }
}

export default musicReducer
