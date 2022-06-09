import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import * as propertyActions from '../../store/property'
import { NavLink } from 'react-router-dom';

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
                            return (
                                <NavLink to={`/properties/${property[1].id}`}>
                                    <div className='property1'>
                                        <h3>{property[1].name}</h3>
                                        <h2>{property[1].price}</h2>
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