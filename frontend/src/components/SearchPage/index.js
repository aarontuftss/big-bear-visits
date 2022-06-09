import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import * as propertyActions from '../../store/property'
import { Redirect } from 'react-router-dom';

import './SearchPage.css';

function SearchPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const properties = useSelector(state => state.properties.allProperties)

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(sessionActions.restoreUser())
            .then(() => dispatch(propertyActions.getAllProperties()))
            .then(() => setIsLoaded(true));
    }, [dispatch]);
    // console.log(properties)

    if (!isLoaded){
        return (
            <>
            <div className='loaderr'>
                <h1>Loading...</h1>
            </div>
            </>
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
                        {Object.entries(properties).map((property)=> {
                            return (
                                <div className='property1'>
                                    <h3>{property[1].name}</h3>
                                    <h2>{property[1].price}</h2>
                                </div>
                            )
                        })}

                    </div>

                    <div className='mapholder'>
                        google maps api
                    </div>

                </div>
                

            </div>
        )}
        </>
    )
}

export default SearchPage;