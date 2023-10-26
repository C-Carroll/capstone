import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Route, useParams, Link } from "react-router-dom";
import { useDispatch} from "react-redux";
import { getReviews, newReview, updateReview, removeRev } from "../../store/review";
import { useModal } from "../../context/Modal";
import { getAlbum } from "../../store/music";

const EditRevModal = ({review}) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const [stars, setStars] = useState(review.rating)
    const [hovered, setHovered] = useState(stars)
    const [reviewDescription, setReviewDescription] = useState(review.ratingDescription)
    const [errors, setErrors] = useState({})
    // const albumId = rev.albumId



    const handleSubmission = async(e) => {
        e.preventDefault()
        setErrors({})
        let err = {}

        if(stars < 1){
            err.stars = 'Must select from 1-5 stars'
        }
        if(!reviewDescription){
            err.txt = 'Must leave a review'
        } else if (reviewDescription.length < 15){
            err.txt = 'Review must be longer than 15 characters'
        }

        if(Object.values(err).length > 0){
            setErrors(err)
        } else {
            console.log('here')
            const rev = {
                rating: hovered,
                ratingDescription: reviewDescription
            }

            // console.log(albumId)
            console.log('start')
            await dispatch(updateReview(review.id, rev))
            console.log('mid')
            await dispatch(getReviews(review.albumId))
            await dispatch(getAlbum(review.albumId))
            closeModal()
            console.log('fin')

        }


    }

    return (
        <div>
            <div className="CRHead">
                What did you think of this album?
            </div>

            <div className="CRForm">
                <form onSubmit={handleSubmission}>
                    <div className="starsCont">
                        <div className='st'>
                            <div
                            onMouseEnter={(() => setHovered(1))}
                            onMouseLeave={(() => setHovered(stars))}
                            onClick={(() => setStars(1))}
                            >
                                <i className={`fa-star ${hovered >= 1 ? 'fa-solid filled' : 'fa-regular'}`}></i>
                            </div>
                            <div
                            onMouseEnter={(() => setHovered(2))}
                            onMouseLeave={(() => setHovered(stars))}
                            onClick={(() => setStars(2))}
                            >
                                <i className={`fa-star ${hovered >= 2 ? 'fa-solid filled' : 'fa-regular'}`}></i>
                            </div>
                            <div
                            onMouseEnter={(() => setHovered(3))}
                            onMouseLeave={(() => setHovered(stars))}
                            onClick={(() => setStars(3))}
                            >
                                <i className={`fa-star ${hovered >= 3 ? 'fa-solid filled' : 'fa-regular'}`}></i>
                            </div>
                            <div
                            onMouseEnter={(() => setHovered(4))}
                            onMouseLeave={(() => setHovered(stars))}
                            onClick={(() => setStars(4))}
                            >
                                <i className={`fa-star ${hovered >= 4 ? 'fa-solid filled' : 'fa-regular'}`}></i>
                            </div>
                            <div
                            onMouseEnter={(() => setHovered(5))}
                            onMouseLeave={(() => setHovered(stars))}
                            onClick={(() => setStars(5))}
                            >
                                <i className={`fa-star ${hovered >= 5 ? 'fa-solid filled' : 'fa-regular'}`}></i>
                            </div>

                        </div>
                        {errors.stars && <div className="revErr">{errors.stars}</div>}
                    </div>

                    <div className="revTxt">
                        <textarea
                        id='thebox'
                        placeholder="What did you think?"
                        value={reviewDescription}
                        onChange={(e) => setReviewDescription(e.target.value)}
                        />
                        {errors.txt && <div className="revErr">{errors.txt}</div>}
                    </div>

                    <button type="submit">Submit Review</button>
                </form>
            </div>
        </div>
    )
}
export default EditRevModal
