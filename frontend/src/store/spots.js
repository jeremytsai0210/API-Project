import { csrfFetch } from "./csrf";

// Action Types
export const LOAD_SPOTS = "spots/LOAD_SPOTS";
export const ADD_SPOT = "spots/ADD_SPOT";
export const UPDATE_SPOT = "spots/UPDATE_SPOT";
export const DELETE_SPOT = "spots/DELETE_SPOT";

// Action Creators
// GET
const load = (spots) => {
    // console.log('Action - Loading Spots:', spots);
    return {
        type: LOAD_SPOTS,
        spots: spots.Spots
    };
}

// POST
const add = (spot) => {
    // console.log('Action - Adding Spot:', spot);
    return {
        type: ADD_SPOT,
        spot
    };
}

// PUT
const update = (spot) => {
    // console.log('Action - Updating Spot:', spot);
    return {
        type: UPDATE_SPOT,
        spot
    };
}

// DELETE
const remove = (spotId) => {
    // console.log('Action - Deleting Spot:', spotId);
    return {
        type: DELETE_SPOT,
        spotId
    }
}

// Validate user
const isLoggedIn = (state) => {
    // console.log('Checking if there is a logged in User');
    return state.session.user !== null;
}

// GET all Spots
export const getAllSpots = () => async dispatch => {
    // console.log('Fetch - GET all Spots');
    const response = await fetch('/api/spots');

    if (response.ok) {
        const spots = await response.json();
        dispatch(load(spots));
    }
};

// GET a single Spot
export const fetchSpotDetails = (spotId) => async dispatch => {
    // console.log('Fetch - GET single Spot');
    const response = await fetch(`/api/spots/${spotId}`);

    if (response.ok) {
        const spot = await response.json();
        dispatch(add(spot));
    }
};

// CREATE a new Spot
export const addSpot = (spotData) => async (dispatch, getState) => {
    // console.log('Fetch - POST new Spot');
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

    if(response.ok) {
        const spot = await response.json();
        dispatch(add(spot));
        return spot;
    }
}

// UPDATE a Spot
export const updateSpot = (spotData, spotId) => async (dispatch, getState) => {
    // console.log('Fetch - PUT update Spot');
    const state = getState();

    if(!isLoggedIn(state)) {
        alert("You must be logged in to update a spot.");
        return;
    }

    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spotData)
    });

    if(response.ok) {
        const updatedSpot = await response.json();
        dispatch(update(updatedSpot));
        return updatedSpot;
    }
}

// DELETE a Spot
export const deleteSpot = (spotId) => async (dispatch, getState) => {
    // console.log('Fetch - DELETE Spot');
    const state = getState();

    if(!isLoggedIn(state)) {
        alert("You must be logged in to delete a spot.");
        return;
    }

    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });

    if(response.ok) {
        dispatch(remove(spotId));
    }
}

const initialState = {};

// REDUCER
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS: {
            if(!Array.isArray(action.spots)) {
                console.log("EXPECTED AN ARRAY", action.spots);
                return state;
            }
            const allSpots = {};
            action.spots.forEach((spot) => {
                allSpots[spot.id] = spot;
            });
            return {
                ...state,
                ...allSpots
            };
        }
        case ADD_SPOT: {
            return {
                ...state,
                [action.spot.id]: action.spot
            };
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
        default:
            return state;
    }
}

export default spotsReducer;