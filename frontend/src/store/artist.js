import { csrfFetch } from "./csrf";

const ARTIST = "artist/singleArtist"
const DELETE_ARTIST = 'artist/deleteArtist'


const singleArtist = (artist) => ({
    type: ARTIST,
    payload: artist
})
const deleteArtist = (userId) => ({
    type: DELETE_ARTIST,
    payload: userId
})

export const getArtist = (artistId) => async(dispatch) => {
    try {
        const response = await csrfFetch(`/api/artist/${artistId}`)
        if(response.ok){
            const artist = await response.json()
            dispatch(singleArtist(artist))
            return response
        }
    } catch(e) {
        console.log(e)
    }
}

export const newArtist = (artistInfo) => async(dispatch) => {
    const { name, description } = artistInfo
    const response = await csrfFetch('/api/artist/newArtist', {
        method: 'POST',
        body: JSON.stringify({
            name,
            description
        })
    })
    if (response.ok){
        const newCreator = await response.json()
        dispatch(getArtist(newCreator))
        return newCreator
    } else throw new Error ('action failed')
}

export const updateArtist = (artistId, artistInfo) => async(dispatch) => {
    const { name, description } = artistInfo
    const response = await csrfFetch(`/api/update/${artistId}`, {
        method: 'PUT',
        body: JSON.stringify({
            name,
            description
        })
    })
    if(response.ok){
        const updatedArtist = await response.json()
        dispatch(singleArtist(updatedArtist))
        return response
    } else throw new Error ('action failed')
}

export const removeArtist = (userId) => async(dispatch) => {
    const response = await csrfFetch(`/api/artist/delete/${userId}`, {method: 'DELETE'})
    if(response.ok){
        dispatch(deleteArtist(userId))
    }
}

const initialState = {
    artist: null
}
const artistReducer = (state = initialState, action) => {
    switch (action.type) {
        case ARTIST:
            return {
                ...state,
                artist: action.payload
            }
        default: return state
    }
}
export default artistReducer
