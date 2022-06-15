import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import * as reservationActions from "../../store/reservation"
import * as propertyActions from '../../store/property';

import { DateRange } from 'react-date-range';

import './Forms.css';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

function EditReservation() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const currentRes = useSelector((state) => state.reservations.singleReservation.reservation);

    const property = useSelector(state => state.properties.singleProperty.property);

    const location = window.location.href.split('/')
    const id = location[location.length - 2]

    const { propId } = useParams()
    console.log(propId)

    const [errors, setErrors] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const [disabled, setDisabled] = useState([])

    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    useEffect(() => {
        dispatch(reservationActions.getOneReservation(id))
        .then(() => dispatch(propertyActions.getOneProperty(propId)))
        .then(()=> {
            property?.Reservations.map((r) => {
                return inbetweens(r.startDate, r.endDate)
            })
        })
        .then(()=> setIsLoaded(true))
    }, [dispatch]);

    useEffect(() => {
        console.log(currentRes)

    }, [isLoaded]);

    useEffect(() => {
    }, [state])

    function inbetweens(start, end) {
        for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
            disabled.push(new Date(dt))
            arr.push(new Date(dt));
        }
        console.log(arr)
        return arr
    }

    const oof = property?.Reservations.map((r) => {
        return inbetweens(r.startDate, r.endDate)
    })

    
    if (!sessionUser) return <Redirect to="/login" />;
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            propertyId: currentRes.propertyId,
            renterId: currentRes.renterId,
            startDate: state[0].startDate,
            endDate: state[0].endDate,
            id: id
        }
        await dispatch(reservationActions.editReservation(data))
            .then(() => history.push(`/users/${sessionUser.id}`))

    };

    const handleDelete = async () => {

        await dispatch(reservationActions.deleteReservation(id))
        history.push(`/users/${sessionUser.id}`)
        
    }
    
    


    return (
            <>
            <div>
                {isLoaded && (
                    <>
                    <div className="support-area">

                    </div>
                    <div className="updateRes-hero">
                        <h1>Your Reservation at {property?.name}</h1>
                        <h2>{currentRes.startDate.split('T')[0]} - {currentRes.endDate.split('T')[0]}</h2>
                        <form onSubmit={handleSubmit}>
                            <ul>
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                            </ul>
                            <DateRange
                            editableDateInputs={true}
                            minDate={new Date()}
                            onChange={item => { setState([item.selection]); }}
                            moveRangeOnFirstSelection={false}
                            ranges={state}
                            disabledDates={[...disabled]}
                            />
                        </form>
                        <div className="fBHold">
                            <button onClick={handleSubmit}>Change Dates</button>
                            <button onClick={handleDelete}>Delete Reservation</button>
                        </div>
                    </div>
                    </>
                )}
                </div>
                </>
                );
            }
            
            export default EditReservation;