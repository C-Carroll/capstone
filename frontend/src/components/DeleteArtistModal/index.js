import { removeArtist } from "../../store/artist";
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom"
import { useModal } from "../../context/Modal";
import { updateArtist } from "../../store/artist";
import { getAlbums } from "../../store/music";
import './DAM.css'

const DeleteArtistModal = ({user}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()


    const deleteArtist = async(e, user) => {
        e.preventDefault()
        console.log(user)
        if (user) {
            let userId = user.id
            await dispatch(removeArtist(userId))
            await dispatch(sessionActions.isArtist(userId))
            await dispatch(getAlbums)

            history.push('/albums')
            closeModal()
        }
    }
    const cancel = (e) => {
        e.preventDefault()
        closeModal()
    }

    return (
        <div>
            <div className="delHed">
                Are You Sure You Want to Delete Your Artist Profile?<br />
                All Music Will Be Lost Into The Void...
            </div>
            <div className="butts">
                <div id='del' onClick={(e) => {deleteArtist(e, user)}}>
                    Delete
                </div>
                <div id='can' onClick={(e) => {cancel(e)}}>
                    Cancel
                </div>
            </div>
        </div>
    )


}

export default DeleteArtistModal
