import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import * as sessionActions from '../../store/session';

const ArtistButton = ({user}) => {
    const dispatch = useDispatch()
    console.log(user)
    const userId = user.id
    const artist = useSelector((state) => state.session.artist)
    console.log(artist)

    useEffect(() => {
        dispatch(sessionActions.isArtist(userId))
    },[dispatch])

    return(
        <div>
            {artist ? <div>{artist.id}</div> : <div>become an artist</div>  }
        </div>
    )
}

export default ArtistButton
