const GET_PROPERTIES = 'properties/GET';
const GET_ONE_PROPERTY = 'property/GET/ONE';
const NEW_PROPERTY = 'property/NEW';
const EDIT_PROPERTY = 'property/EDIT'
const DELETE_PROPERTY = 'property/DELETE'

// GET ALL PROPERTIES
export const getAllProperties = () => async (dispatch) => {

    const response = await fetch('/api/properties/')
    if (response.ok) {
        const properties = await response.json();
        dispatch(allPropertiesAction(properties));
        return properties
    }

    return response.code; // ERROR HANDLING?
}

const allPropertiesAction = (properties) => ({
    type: GET_PROPERTIES,
    properties
})

// GET ONE PROPERTY
export const getOneProperty = (propertyId) => async (dispatch) => {
    const response = await fetch(`/api/properties/${propertyId}`);

    if (response.ok) {
        const property = await response.json();
        dispatch(onePropertyAction(property));
        return property;
    }

    return response.code; // ERROR HANDLING?
}

const onePropertyAction = (property) => ({
    type: GET_ONE_PROPERTY,
    property
})

// POST NEW PROPERTY
export const uploadNewProperty = (property) => async (dispatch) => {
    const response = await fetch('/api/properties', {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // ****** MIGHT NEED TO COME BACK TO THIS
        body: JSON.stringify(property)
    })

    if (response.ok) {
        const newProperty = await response.json();
        dispatch(newPropertyAction(newProperty));
        return newProperty;
    }

    return response.code; // ERROR HANDLING?
}

const newPropertyAction = (property) => ({
    type: NEW_PROPERTY,
    property
})

// EDIT A PROPERTY
export const editProperty = (property) => async (dispatch) => {
    const response = await fetch(`/api/properties/${property.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }, // ****** MIGHT NEED TO COME BACK TO THIS
        body: JSON.stringify(property)
    })

    if (response.ok) {
        const editProperty = await response.json();
        dispatch(editPropertyAction(editProperty));
        return editProperty;
    }

    return response.code; // ERROR HANDLING?
}

const editPropertyAction = (property) => ({
    type: EDIT_PROPERTY,
    property
})

// DELETE A PROPERTY
export const deleteProperty = (propertyId) => async (dispatch) => {
    const response = await fetch(`/api/properties/${propertyId}`, {
        method: "DELETE"
    }); // DO WE NEED TO REMOVE CSRF?

    if (response.ok) {
        dispatch(deletePropertyAction(propertyId))
        return true;
    }
}

const deletePropertyAction = (propertyId) => ({
    type: DELETE_PROPERTY,
    propertyId
})


const initialState = {
    allProperties: {},
    singleProperty: {},
};

const propertyReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_PROPERTIES:
            newState = Object.assign({}, state);
            action.properties.properties.forEach(property => {
                newState.allProperties[property.id] = property
            });
            return newState;
        case GET_ONE_PROPERTY:
            newState = Object.assign({}, state);
            newState.singleProperty = action.property;
            return newState;
        case NEW_PROPERTY:
            newState = Object.assign({}, state);
            newState.allProperties[action.property.id] = action.property;
            return newState;
        case EDIT_PROPERTY:
            newState = Object.assign({}, state);
            newState.allProperties[action.property.id] = action.property;
            return newState;
        case DELETE_PROPERTY:
            newState = Object.assign({}, state);
            delete newState.allProperties[action.propertyId];
            return newState;
        default:
            return state;
    }
}

export default propertyReducer;
