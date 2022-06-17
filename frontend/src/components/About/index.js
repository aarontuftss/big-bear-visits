import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import * as propertyActions from '../../store/property';
import * as reservationActions from '../../store/reservation';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import SimpleImageSlider from "react-simple-image-slider";

import bedIcon from './bedIcon.png'
import bathIcon from './bathIcon.png'
import maxPpl from './maxPpl.png'
import loaderGif from './mapLoader.gif'

import './PropertyPage.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

function PropertyPage(props) {
    const dispatch = useDispatch();
    const history = useHistory()
    const [errors, setErrors] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false)

    const sessionUser = useSelector(state => state.session.user);
    const property = useSelector(state => state.properties.singleProperty.property);

    const location = window.location.href.split('/')
    const id = location[location.length - 1]

    const [disabled, setDisabled] = useState([])



    useEffect(() => {
        dispatch(sessionActions.restoreUser())
            .then(() => dispatch(propertyActions.getOneProperty(id)))
            .then(() => dispatch(reservationActions.getAllReservations()))
            .then(() => {
                // property.Reservations.map((r) => {
                //     return inbetweens(r.startDate, r.endDate)
                // })
            })
            .then(() => setIsLoaded(true));
    }, [dispatch]);



    if (!isLoaded) {
        return (
            <div className='loaderr'>
                <img src={loaderGif} alt=''></img>
            </div>
        )
    }


    return (
        <>
            {isLoaded && (
                <div className='propertyPage-main'>
                    
                </div>
            )}
        </>
    )
}

export default PropertyPage;