import { csrfFetch } from "./csrf";

export const LOAD_SPOTS = "spots/LOAD_SPOTS";
export const ADD_SPOT = "spots/ADD_SPOT";
export const UPDATE_SPOT = "spots/UPDATE_SPOT";
export const DELETE_SPOT = "spots/DELETE_SPOT";

// GET
const load = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    };
}

// POST
const add = (spot) => {
    return {
        type: ADD_SPOT,
        spot
    };
}

// PUT
const update = (spot) => {
    return {
        type: UPDATE_SPOT,
        spot
    };
}

// DELETE
const remove = (spotId) => {
    type: DELETE_SPOT
}

// Validate user
const isLoggedIn = (state) => {
    return state.session.user !== null;
}

// GET all Spots
export const getAllSpots = () => async dispatch => {
    const response = await fetch('/api/spots');

    if (response.ok) {
        const spots = await response.json();
        dispatch(load(spots));
    }
};

// CREATE a new Spot
export const addSpot = (spotData) => async (dispatch, getState) => {
    const state = getState();
    
    if(!isLoggedIn(state)) {
        alert("You must be logged in to add a spot.");
        return;
    }

    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spotData)
    });

    const spot = await response.json();
    dispatch(add(spot));
    return spot;
}

// UPDATE a Spot
export const updateSpot = (spotData, spotId) => async (dispatch, getState) => {
    const state = getState();

    if(!isLoggedIn(state)) {
        alert("You must be logged into update a spot.");
        return;
    }

    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spotData)
    });
}
const initialState = {};

// REDUCER
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS: {
            const allSpots = {};
            action.spots.forEach(spot => {
                allSpots[spot.id] = spot;
            });
            return {
                ...state,
                ...allSpots
            };
        }
        case ADD_SPOT: {

        }
        case UPDATE_SPOT: {
            return {
                ...state,
                [action.spot.id]: action.spot
            };
        }
        case DELETE_SPOT: {
            const allSpots = {...state};
            delete allSpots[action.spotId];
            return allSpots;
        }
        defualt:
            return state;
    }
}

export default spotsReducer;