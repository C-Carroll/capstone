import './DelRevMod.css'
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Route, useParams, Link } from "react-router-dom";
import { useDispatch} from "react-redux";
import { getReviews, newReview, updatedReview, removeRev } from "../../store/review";
import { useModal } from "../../context/Modal";
import { getAlbum } from "../../store/music";

const DeleteRevModal = ({review}) => {

    const dispatch = useDispatch()
    const { closeModal } = useModal()


    const deleteReview = async(e) => {
        e.preventDefault()
        console.log(review)
            await dispatch(removeRev(review.id))
            await dispatch(getReviews(review.albumId))
            await dispatch(getAlbum(review.albumId))
            closeModal()

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
                <div id='del' onClick={(e) => {deleteReview(e, review)}}>
                    Delete
                </div>
                <div id='can' onClick={(e) => {cancel(e)}}>
                    Cancel
                </div>
            </div>
        </div>
    )

}

export default DeleteRevModal
