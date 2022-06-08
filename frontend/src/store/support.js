const GET_SUPPORTS = 'supports/GET';
const GET_ONE_SUPPORT = 'support/GET/ONE';
const NEW_SUPPORT = 'support/NEW';
const EDIT_SUPPORT = 'support/EDIT'
const DELETE_SUPPORT = 'support/DELETE'

// GET ALL SUPPORTS
export const getAllSupports = () => async (dispatch) => {

    const response = await fetch('/api/supports/')
    if (response.ok) {
        const supports = await response.json();
        dispatch(allSupportsAction(supports));
        return supports
    }

    return response.code; // ERROR HANDLING?
}

const allSupportsAction = (supports) => ({
    type: GET_SUPPORTS,
    supports
})

// GET ONE SUPPORT
export const getOneSupport = (supportId) => async (dispatch) => {
    const response = await fetch(`/api/supports/${supportId}`);

    if (response.ok) {
        const support = await response.json();
        dispatch(oneSupportAction(support));
        return support;
    }

    return response.code; // ERROR HANDLING?
}

const oneSupportAction = (support) => ({
    type: GET_ONE_SUPPORT,
    support
})

// POST NEW SUPPORT
export const uploadNewSupport = (support) => async (dispatch) => {
    const response = await fetch('/api/supports', {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // ****** MIGHT NEED TO COME BACK TO THIS
        body: JSON.stringify(support)
    })

    if (response.ok) {
        const newSupport = await response.json();
        dispatch(newSupportAction(newSupport));
        return newSupport;
    }

    return response.code; // ERROR HANDLING?
}

const newSupportAction = (support) => ({
    type: NEW_SUPPORT,
    support
})

// EDIT A SUPPORT
export const editSupport = (support) => async (dispatch) => {
    const response = await fetch(`/api/supports/${support.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }, // ****** MIGHT NEED TO COME BACK TO THIS
        body: JSON.stringify(support)
    })

    if (response.ok) {
        const editSupport = await response.json();
        dispatch(editSupportAction(editSupport));
        return editSupport;
    }

    return response.code; // ERROR HANDLING?
}

const editSupportAction = (support) => ({
    type: EDIT_SUPPORT,
    support
})

// DELETE A SUPPORT
export const deleteSupport = (supportId) => async (dispatch) => {
    const response = await fetch(`/api/supports/${supportId}`, {
        method: "DELETE"
    }); // DO WE NEED TO REMOVE CSRF?

    if (response.ok) {
        dispatch(deleteSupportAction(supportId))
        return true;
    }
}

const deleteSupportAction = (supportId) => ({
    type: DELETE_SUPPORT,
    supportId
})


const initialState = {
    allSupports: {},
    singleSupport: {},
};

const supportReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_SUPPORTS:
            newState = Object.assign({}, state);
            action.supports.supports.forEach(support => {
                newState.allSupports[support.id] = support
            });
            return newState;
        case GET_ONE_SUPPORT:
            newState = Object.assign({}, state);
            newState.singleSupport = action.support;
            return newState;
        case NEW_SUPPORT:
            newState = Object.assign({}, state);
            newState.allSupports[action.support.id] = action.support;
            return newState;
        case EDIT_SUPPORT:
            newState = Object.assign({}, state);
            newState.allSupports[action.support.id] = action.support;
            return newState;
        case DELETE_SUPPORT:
            newState = Object.assign({}, state);
            delete newState.allSupports[action.supportId];
            return newState;
        default:
            return state;
    }
}

export default supportReducer;
