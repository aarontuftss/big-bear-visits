import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import * as propertyActions from '../../store/property';
import * as reservationActions from '../../store/reservation';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import SimpleImageSlider from "react-simple-image-slider";

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
            .then(() => setIsLoaded(true));
    }, [dispatch]);

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

    if(!isLoaded){
        return (
            <div className='loaderr'>
                Loading...
            </div>
        )
    }

    if (!property.name) {
        history.push('/search')
    }

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
                    <div className='statHold'>

                    </div>
                </div>

                <div className='centerContent'>

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
                    />
                    <form onSubmit={handleSubmit}>
                        <ul>
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>

                        <button type="submit">Book Your Stay</button>
                    </form>
                </div>
            </div>
        )}
        </>
    )
}

export default PropertyPage;