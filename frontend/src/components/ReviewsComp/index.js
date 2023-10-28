import './RevComp.css'
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Route, useParams, Link } from "react-router-dom";
import { useDispatch} from "react-redux";
import { getReviews, newReview, updatedReview, removeRev } from "../../store/review";
import OpenModalButton from '../OpenModalButton'
import CreateRevModal from '../CreateRevModal'
import DeleteRevModal from '../DeleteRevModal';
import EditRevModal from '../EditReviewModal';

const ReviewComponet = ({album}) => {
    console.log('HERERERERER', album)
    const dispatch = useDispatch()
    const reviews = useSelector((state) => state.review.reviews)
    const user = useSelector((state) => state.session.user)

    const [hasRev, setHasRev] = useState(false)
    const [owner, setOwner] = useState(false)


    useEffect(() => {
         dispatch(getReviews(album.id))
    },[dispatch, album.id])

    useEffect(() => {
        if(user && reviews){
            setHasRev(false)
            console.log(reviews)
            console.log(user)
            reviews.map((rev) => {
                console.log(rev.userId, user.id)
                if (rev.userId === user.id){
                    setHasRev(true)
                    console.log('gogogo')
                }
            })
        }
    }, [setHasRev, user, reviews])
    useEffect(() => {
        if (user) {
            if (user.id === album.Artist.userId){
                setOwner(true)
            } else { setOwner(false)}
        }
    })

    const CreateRevB = () => {
        if (owner ^ hasRev ){}else if (user) {
            console.log(hasRev)
            return (
                <div className='createRevButt'>
                    <OpenModalButton
                    buttonText='Add Review'
                    modalComponent={<CreateRevModal album={album}/>}
                    />
                </div>
            )
        }
    }

    const deleteButt = (userId, rev) => {
        if (userId === rev.userId){
            return(
                <div className='delRevBut'>
                    <OpenModalButton
                    buttonText='Delete Review'
                    modalComponent={<DeleteRevModal review={rev} />}
                    />
                </div>
            )
        }
    }

    const editRevButt = (userId, rev) => {
        if (userId === rev.userId){
            return(
                <div className='delRevBut'>
                    <OpenModalButton
                    buttonText='Edit Review'
                    modalComponent={<EditRevModal review={rev} />}
                    />
                </div>
            )
        }
    }


    return(
        <div >
            <div className='ooof'>
                <CreateRevB />
            </div>
            {reviews.length ?
                <div>

                    <div className='revHead'>
                        Reviews:
                    </div>


                    <div className='revBod'>
                        {reviews.sort((a,b) => b.id - a.id).map((rev) => (
                            <div className='revs'>
                                <div className='revUserInfo'>
                                    {rev.User.firstName} {rev.User.lastName.slice(0,1)}
                                </div>
                                <div className='revRating'>
                                    {rev.rating}
                                </div>
                                <div className='revRatingDesc'>
                                    {rev.ratingDescription}
                                </div>
                                <div className='editNDelButt'>
                                    {user && editRevButt(user.id, rev)}
                                </div>
                                {user && deleteButt(user.id, rev)}
                            </div>
                        ))}
                    </div>


                </div>
            : <div>no reviews yet</div>}
        </div>
    )
}

export default ReviewComponet
