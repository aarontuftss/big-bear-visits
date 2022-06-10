import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as reservationActions from "../../store/reservation"
import './Forms.css';


function NewSupport() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);

    const location = window.location.href.split('/')
    const id = location[location.length - 1]

    const [propertyId, setPropertyId] = useState(id);
    const [renterId, setRenterId] = useState(sessionUser.id);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [errors, setErrors] = useState([]);

    if (!sessionUser) return <Redirect to="/login" />;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            propertyId: propertyId,
            renterId: renterId,
            startDate: startDate,
            endDate: endDate
        }
        await dispatch(reservationActions.uploadNewReservation(data))
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
            <button type="submit">Book Your Stay</button>
        </form>
    );
}

export default NewSupport;