const GET_RESERVATIONS = 'reservations/GET';
const GET_ONE_RESERVATION = 'reservation/GET/ONE';
const NEW_RESERVATION = 'reservation/NEW';
const EDIT_RESERVATION = 'reservation/EDIT'
const DELETE_RESERVATION = 'reservation/DELETE'

// GET ALL RESERVATIONS
export const getAllReservations = () => async (dispatch) => {

    const response = await fetch('/api/reservations/')
    if (response.ok) {
        const reservations = await response.json();
        dispatch(allReservationsAction(reservations));
        return reservations
    }

    return response.code; // ERROR HANDLING?
}

const allReservationsAction = (reservations) => ({
    type: GET_RESERVATIONS,
    reservations
})

// GET ONE RESERVATION
export const getOneReservation = (reservationId) => async (dispatch) => {
    const response = await fetch(`/api/reservations/${reservationId}`);

    if (response.ok) {
        const reservation = await response.json();
        dispatch(oneReservationAction(reservation));
        return reservation;
    }

    return response.code; // ERROR HANDLING?
}

const oneReservationAction = (reservation) => ({
    type: GET_ONE_RESERVATION,
    reservation
})

// POST NEW RESERVATION
export const uploadNewReservation = (reservation) => async (dispatch) => {
    const response = await fetch('/api/reservations', {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // ****** MIGHT NEED TO COME BACK TO THIS
        body: JSON.stringify(reservation)
    })

    if (response.ok) {
        const newReservation = await response.json();
        dispatch(newReservationAction(newReservation));
        return newReservation;
    }

    return response.code; // ERROR HANDLING?
}

const newReservationAction = (reservation) => ({
    type: NEW_RESERVATION,
    reservation
})

// EDIT A RESERVATION
export const editReservation = (reservation) => async (dispatch) => {
    const response = await fetch(`/api/reservations/${reservation.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }, // ****** MIGHT NEED TO COME BACK TO THIS
        body: JSON.stringify(reservation)
    })

    if (response.ok) {
        const editReservation = await response.json();
        dispatch(editReservationAction(editReservation));
        return editReservation;
    }

    return response.code; // ERROR HANDLING?
}

const editReservationAction = (reservation) => ({
    type: EDIT_RESERVATION,
    reservation
})

// DELETE A RESERVATION
export const deleteReservation = (reservationId) => async (dispatch) => {
    const response = await fetch(`/api/reservations/${reservationId}`, {
        method: "DELETE"
    }); // DO WE NEED TO REMOVE CSRF?

    if (response.ok) {
        dispatch(deleteReservationAction(reservationId))
        return true;
    }
}

const deleteReservationAction = (reservationId) => ({
    type: DELETE_RESERVATION,
    reservationId
})


const initialState = {
    allReservations: {},
    singleReservation: {},
};

const reservationReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_RESERVATIONS:
            newState = Object.assign({}, state);
            action.reservations.reservations.forEach(reservation => {
                newState.allReservations[reservation.id] = reservation
            });
            return newState;
        case GET_ONE_RESERVATION:
            newState = Object.assign({}, state);
            newState.singleReservation = action.reservation;
            return newState;
        case NEW_RESERVATION:
            newState = Object.assign({}, state);
            newState.allReservations[action.reservation.id] = action.reservation;
            return newState;
        case EDIT_RESERVATION:
            newState = Object.assign({}, state);
            newState.allReservations[action.reservation.id] = action.reservation;
            return newState;
        case DELETE_RESERVATION:
            newState = Object.assign({}, state);
            delete newState.allReservations[action.reservationId];
            return newState;
        default:
            return state;
    }
}

export default reservationReducer;