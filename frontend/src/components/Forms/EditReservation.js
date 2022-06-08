import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as reservationActions from "../../store/reservation"
import './Forms.css';


function EditReservation() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const currentRes = useSelector((state) => state.reservations.singleReservation.reservation);

    const location = window.location.href.split('/')
    const id = location[location.length - 1]
    

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [errors, setErrors] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(reservationActions.getOneReservation(id))
        .then(()=> setIsLoaded(true))
    }, [dispatch]);

    useEffect(() => {
        console.log(currentRes)

    }, [isLoaded]);

    
    if (!sessionUser) return <Redirect to="/login" />;
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log()

        const data = {
            propertyId: currentRes.propertyId,
            renterId: currentRes.renterId,
            startDate: startDate,
            endDate: endDate,
            id: currentRes.id
        }
        await dispatch(reservationActions.editReservation(data))
            .then(() => history.push(`/users/${sessionUser.id}`))

    };


    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
                Start
                <input
                    type="date"
                    // value={}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                />
            </label>
            <label>
                End
                <input
                    type="date"
                    // value={}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Change Reservation</button>
        </form>
    );
}

export default EditReservation;