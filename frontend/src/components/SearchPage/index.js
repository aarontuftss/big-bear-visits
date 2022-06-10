import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import * as propertyActions from '../../store/property'
import { NavLink, useHistory } from 'react-router-dom';
import getCoord from './geocode';

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


import bedIcon from './bedIcon.png'
import bathIcon from './bathIcon.png'
import maxPpl from './maxPpl.png'
import loaderGif from './mapLoader.gif'

import './SearchPage.css';

function SearchPage() {
    const dispatch = useDispatch();
    const properties = useSelector(state => Object.entries(state.properties.allProperties))
    const [filteredProp, setFilteredProp] = useState(useSelector(state => Object.entries(state.properties.allProperties)))
    const key = useSelector(state => state.key)

    const history = useHistory()

    const [isLoaded, setIsLoaded] = useState(false);

    // const Marker = ({ text }) => <div>{text}</div>;

    useEffect(() => {
        dispatch(sessionActions.restoreUser())
        .then(() => dispatch(propertyActions.getAllProperties()))
        // .then(() => setIsLoaded(true));
    }, [dispatch]);


    async function gg(){
        for(let i = 0; i < filteredProp.length; i++){
            filteredProp[i][1]['coordinates'] = await getCoord(filteredProp[i][1].address, filteredProp[i][1].city, filteredProp[i][1].state, key)
        }
    }

    useEffect(() => {
        gg()
        .then(() => setIsLoaded(true));
    }, []);




    // getCoord(p[1].address, p[1].city, p[1].state, key)


    if (!isLoaded){
        return (
            <>
            <div className='loaderr'>
                <img src={loaderGif} alt=''></img>
            </div>
            </>
        )
    }


    async function filter(){
        setFilteredProp(
            properties.filter((prop)=> {
                return prop[1].id > 5
            })
        )
        
    }

    // function lol () {
    //     console.log('lol')
    //     history.push
    // }

    function SimpleMap() {

        const mapStyles = {
            height: "100%",
            width: "100%"
        };

        const defaultCenter = {
            lat: 34.247569, lng: -116.891459
        }

        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '100%', width: '100%' }}>
                <LoadScript
                    googleMapsApiKey={key}>
                    <GoogleMap
                        mapContainerStyle={mapStyles}
                        zoom={13}
                        center={defaultCenter}
                    >
                        {filteredProp.map((p)=> {
                            return (
                                <Marker key={p[1].name} position={p[1].coordinates} url={`/propertyies/${p[1].id}`} clickable={true} onClick={()=> history.push(`/properties/${p[1].id}`)}/>
                            )
                        })}
                    </GoogleMap>
                </LoadScript>
            </div>
        );
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
                        <button onClick={filter}>click</button>
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
                        <SimpleMap />
                    </div>

                </div>
                

            </div>
        )}
        </>
    )
}

export default SearchPage;