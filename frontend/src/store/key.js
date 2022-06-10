import { csrfFetch } from "./csrf";

const GET_KEY = 'key/GET/ONE';



// GET ONE PROPERTY
export const getKey = () => async (dispatch) => {
    const response = await csrfFetch(`/api/key/`);

    if (response) {
        const key = await response.json();
        dispatch(onePropertyAction(key));
        return key;
    }

    return response.code; // ERROR HANDLING?
}

const onePropertyAction = (key) => ({
    type: GET_KEY,
    key
})



const initialState = '';

const keyReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_KEY:
            newState = action.key
            return newState;
        default:
            return state;
    }
}

export default keyReducer;