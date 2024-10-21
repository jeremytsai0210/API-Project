import { csrfFetch } from './csrf';

// Action Types
const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
const ADD_REVIEW = 'reviews/ADD_REVIEW';
const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';

// Action Creators
const loadReviews = (spotId, reviews) => ({
    type: LOAD_REVIEWS,
    spotId,
    reviews,
});

const addReview = (review) => ({
    type: ADD_REVIEW,
    review,
});

const removeReview = (reviewId) => ({
    type: REMOVE_REVIEW,
    reviewId,
});

// Thunks
export const fetchReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadReviews(spotId, reviews));
    }
};

export const createReview = (spotId, review) => async dispatch => {
    const response = await csrfFetch(`/api/${spotId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
    });
    if (response.ok) {
        const newReview = await response.json();
        dispatch(addReview(newReview));
        dispatch(fetchReviews(spotId));
        return newReview;
    }
};

export const deleteReview = ( reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        dispatch(removeReview(reviewId));
    }
};

// Reducer
const initialState = {};

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS: {
            const loadedState = {};
            action.reviews.forEach((review) => {
                loadedState[review.id] = review;
            });
            return loadedState;
        }
        case ADD_REVIEW:
            return {
                ...state,
                [action.review.id]: action.review,
            };
        case REMOVE_REVIEW: {
            const updatedState = { ...state };
            delete updatedState[action.reviewId];
            return updatedState;
        }
        default:
            return state;
    }
};

export default reviewsReducer;