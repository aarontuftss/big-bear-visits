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


    function inbetweens(start, end){
        for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
            disabled.push(new Date(dt))
            arr.push(new Date(dt));
        }
        console.log(arr)
        return arr
    }

    useEffect(()=> {
        // if (property) {
        //     setDisabled(property.Reservations.map((r) => {
        //         return inbetweens(r.startDate, r.endDate)
        //     }))
        // }
        
    }, [])
    

    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    useEffect(() => {
        dispatch(sessionActions.restoreUser())
            .then(()=> dispatch(propertyActions.getOneProperty(id)))
            .then(()=> dispatch(reservationActions.getAllReservations()))
            .then(()=> {
                property.Reservations.map((r) => {
                    return inbetweens(r.startDate, r.endDate)
                })
            })
            .then(() => setIsLoaded(true));
    }, [dispatch]);


    useEffect(()=> {
    }, [state])


    console.log(disabled)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!sessionUser) history.push("/login")

        const data = {
            propertyId: id,
            renterId: sessionUser.id,
            startDate: state[0].startDate,
            endDate: state[0].endDate
        }
        await dispatch(reservationActions.uploadNewReservation(data))
            .then(() => history.push(`/users/${sessionUser.id}`))

    };

    function handleEdit(){
        history.push(`/properties/${property.id}/edit`)
    }

    async function handleDelete(e){
        e.preventDefault();
        console.log(property.id)
        await dispatch(propertyActions.deleteProperty(property.id))
        .then(() => dispatch(propertyActions.getAllProperties()))
        history.push(`/users/${sessionUser.id}`)
    }

    if(!isLoaded){
        return (
            <div className='loaderr'>
                <img src={loaderGif} alt=''></img>
            </div>
        )
    }

    // if (!property.name) {
    //     history.push('/search')
    // }

    const images = property.Images.map((image) => {
            return image.link
        })
    
    return (
        <>
        {isLoaded && (
            <div className='propertyPage-main'>
                <div className='sect1'>
                    <h1>{property.name} - ${property.price}/night</h1>
                    <SimpleImageSlider
                        width={850}
                        height={450}
                        images={images}
                        showBullets={true}
                        showNavs={true}
                    />
                    <div className='descriptHold'>
                        <div className='statHold'>
                            <h2><img src={bedIcon} alt='' className='Picon'></img> {property.bedrooms} Bedrooms</h2>
                            <h2><img src={bathIcon} alt='' className='Picon'></img> {property.bathrooms} Bathrooms</h2>
                                <h2><img src={maxPpl} alt='' className='Picon1'></img> {property.maxGuests} Guests</h2>
                        </div>
                        <hr/>
                        <h4>{property.description}</h4>
                    </div>
                </div>
                
                <div className='newResHolder'>
                    <h2>Book Your Stay at {property.name}</h2>
                    <p>Check in : Check out</p>
                    <DateRange
                        editableDateInputs={true}
                        minDate={new Date()}
                        onChange={item => {setState([item.selection]);}}
                        moveRangeOnFirstSelection={false}
                        ranges={state}
                        disabledDates={[...disabled]}
                    />
                    <form onSubmit={handleSubmit}>
                        <ul>
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>

                        <button type="submit">Book Your Stay</button>
                    </form>
                    <div className='crudHold'>
                        {sessionUser && sessionUser.id === property.ownerId &&(
                            <>
                                <button onClick={handleEdit}>Edit Property</button>
                                <button onClick={handleDelete}>Delete Property</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        )}
        </>
    )
}

export default PropertyPage;