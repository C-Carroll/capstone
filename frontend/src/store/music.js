import { csrfFetch } from "./csrf";

const ALBUMS = "albums/allAlbums"
const SINGLEALBUM = "album/singleAlbum"
const SONGS = "songs/songsOnAlbum"

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



const initialState = {
    albums: [],
    album: null,
    songs: []
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
            }
        default: return state
    }
}

export default musicReducer
