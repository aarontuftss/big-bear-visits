import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import * as reservationActions from '../../store/reservation';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import NewReservation from '../Forms/NewReservation';

import './PropertyPage.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

function PropertyPage(props) {
    const dispatch = useDispatch();
    const history = useHistory()
    const [errors, setErrors] = useState([]);
    const sessionUser = useSelector(state => state.session.user);

    const location = window.location.href.split('/')
    const id = location[location.length - 1]

    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    useEffect(()=> {
    }, [state])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!sessionUser) history.push("/login")
        console.log(state)

        const data = {
            propertyId: id,
            renterId: sessionUser.id,
            startDate: state[0].startDate,
            endDate: state[0].endDate
        }
        await dispatch(reservationActions.uploadNewReservation(data))
            .then(() => history.push(`/users/${sessionUser.id}`))

    };




    return (
        <>
            <div className='propertyPage-main'>
                <div className='newResHolder'>
                    <DateRange
                        editableDateInputs={true}
                        minDate={new Date()}
                        onChange={item => {setState([item.selection]);}}
                        moveRangeOnFirstSelection={false}
                        ranges={state}
                    />
                    <form onSubmit={handleSubmit}>
                        <ul>
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>

                        <button type="submit">Book Your Stay</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default PropertyPage;