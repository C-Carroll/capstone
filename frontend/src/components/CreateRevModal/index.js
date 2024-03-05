import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Route, useParams, Link } from "react-router-dom";
import { useDispatch} from "react-redux";
import { getReviews, newReview, updatedReview, removeRev } from "../../store/review";
import { useModal } from "../../context/Modal";
import { getAlbum } from "../../store/music";
import './newRev.css'

const CreateRevModal = ({album}) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const [stars, setStars] = useState(0)
    const [hovered, setHovered] = useState(stars)
    const [reviewDescription, setReviewDescription] = useState('')
    const [errors, setErrors] = useState({})
    const albumId = album.id



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

            console.log(albumId)
            console.log('start')
            await dispatch(newReview(albumId, rev))
            console.log('mid')
            await dispatch(getReviews(albumId))
            await dispatch(getAlbum(albumId))
            closeModal()
            console.log('fin')

        }


    }

    return (
        <div className="revmodCont">
            <div className="background-drip">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill=" #ff8fb1" fill-opacity="1" d="M0,160L16,176C32,192,64,224,96,224C128,224,160,192,192,192C224,192,256,224,288,213.3C320,203,352,149,384,138.7C416,128,448,160,480,192C512,224,544,256,576,234.7C608,213,640,139,672,138.7C704,139,736,213,768,218.7C800,224,832,160,864,133.3C896,107,928,117,960,106.7C992,96,1024,64,1056,90.7C1088,117,1120,203,1152,218.7C1184,235,1216,181,1248,170.7C1280,160,1312,192,1344,181.3C1376,171,1408,117,1424,90.7L1440,64L1440,0L1424,0C1408,0,1376,0,1344,0C1312,0,1280,0,1248,0C1216,0,1184,0,1152,0C1120,0,1088,0,1056,0C1024,0,992,0,960,0C928,0,896,0,864,0C832,0,800,0,768,0C736,0,704,0,672,0C640,0,608,0,576,0C544,0,512,0,480,0C448,0,416,0,384,0C352,0,320,0,288,0C256,0,224,0,192,0C160,0,128,0,96,0C64,0,32,0,16,0L0,0Z"></path>
                </svg>
            </div>
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
export default CreateRevModal
