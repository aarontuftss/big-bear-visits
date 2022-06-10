import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import * as propertyActions from '../../store/property'
import { NavLink } from 'react-router-dom';

import bedIcon from './bedIcon.png'
import bathIcon from './bathIcon.png'
import maxPpl from './maxPpl.png'

import './SearchPage.css';

function SearchPage() {
    const dispatch = useDispatch();
    const properties = useSelector(state => Object.entries(state.properties.allProperties))
    const [filteredProp, setFilteredProp] = useState(properties)

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(sessionActions.restoreUser())
        .then(() => dispatch(propertyActions.getAllProperties()))
        .then(() => setIsLoaded(true));
    }, [dispatch]);

    if (!isLoaded){
        return (
            <>
            <div className='loaderr'>
                <h1>Loading...</h1>
            </div>
            </>
        )
    }


    function filter(){
        setFilteredProp(
            properties.filter((prop)=> {
                return prop[1].id > 5
            })
        )
    }


    return (
        <>
        {isLoaded && (
            <div className='searchPage-main'>
                <div className='filterHoler'>
                    <p>Find Exactly What You Need</p>
                    <form>
                        <input type='date'></input>
                        <input type='date'></input>
                    </form>
                </div>

                <div className='resultHolder'>

                    <div className='rCardHold'>
                        {filteredProp.map((property)=> {
                            const image = property[1].Images[1].link ? property[1].Images[1].link : property[1].Images[0].link
                            return (
                                <NavLink to={`/properties/${property[1].id}`} key={property[0]}>
                                    <div className='property1'>
                                        <img alt='' className='cardImg' src={image}></img>
                                        <h4>{property[1].name} - ${property[1].price}</h4>
                                        <div className='statHolddd'>
                                            <p>{property[1].bedrooms} Bed</p>
                                            <p>{property[1].bathrooms} Bath</p>
                                            <p>{property[1].maxGuests} Guests</p>

                                        </div>
                                    </div>
                                </NavLink>
                            )
                        })}

                    </div>

                    <div className='mapholder'>
                        google maps api
                        <button onClick={filter}>click</button>
                    </div>

                </div>
                

            </div>
        )}
        </>
    )
}

export default SearchPage;