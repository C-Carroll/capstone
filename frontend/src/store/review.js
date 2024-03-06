import { csrfFetch } from "./csrf";

const REVIEWS = "reviews/allReviews";
const SET_REV = "reviews/getRev";
const DELETE_REV = "review/deleteRev";

const allReviews = (reviews) => ({
  type: REVIEWS,
  payload: reviews,
});
const deleteRev = (reviewId) => ({
  type: DELETE_REV,
  payload: reviewId,
});
const getRev = (review) => ({
  type: SET_REV,
  payload: review,
});

export const getReviews = (albumId) => async (dispatch) => {
  const response = await csrfFetch(`/api/review/${albumId}`);
  if (response.ok) {
    const list = await response.json();
    dispatch(allReviews(list));
    return response;
  }
};

export const newReview = (albumId, review) => async (dispatch) => {
  const { rating, ratingDescription } = review;

  const response = await csrfFetch(`/api/review/new/${albumId}`, {
    method: "POST",
    body: JSON.stringify({
      rating,
      ratingDescription,
    }),
  });
  if (response.ok) {
    const newRev = await response.json();
    dispatch(getRev(newRev));
    return newRev;
  }
};

export const updateReview = (reviewId, uRev) => async (dispatch) => {
  const { rating, ratingDescription } = uRev;
  const response = await csrfFetch(`/api/review/update/${reviewId}`, {
    method: "PUT",
    body: JSON.stringify({
      rating,
      ratingDescription,
    }),
  });
  if (response.ok) {
    const updatedReview = await response.json();
    dispatch(getRev(updateReview));
    return response;
  } else {
    throw new Error("action failed");
    console.log("failed update");
  }
};

export const removeRev = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/review/delete/${reviewId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteRev(reviewId));
  }
};

const initaialState = {
  reviews: [],
  review: null,
};

const reviewReducer = (state = initaialState, action) => {
  switch (action.type) {
    case REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
    case SET_REV:
      return {
        ...state,
        review: action.payload,
      };
    case DELETE_REV:
      return {
        ...state,
        review: action.payload,
      };
    default:
      return state;
  }
};

export default reviewReducer;
