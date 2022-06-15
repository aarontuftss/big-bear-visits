import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import * as propertyActions from '../../store/property'
import { NavLink, useHistory } from 'react-router-dom';
import getCoord from './geocode';

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import loaderGif from './mapLoader.gif'

import './SearchPage.css';

function SearchPage() {
    const dispatch = useDispatch();
    const properties = useSelector(state => state.properties.allProperties)
    const [filteredProp, setFilteredProp] = useState(properties)
    const key = useSelector(state => state.key)


    const history = useHistory()

    const [isLoaded, setIsLoaded] = useState(false);


    const [checkIn, setCheckin] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [bedrooms, setBedrooms] = useState(0)
    const [bathrooms, setBathrooms] = useState(0)
    const [guests, setGuests] = useState(0)



    useEffect(() => {
        dispatch(sessionActions.restoreUser())
        .then(() => dispatch(propertyActions.getAllProperties()))
        // .then(()=> setFilteredProp(properties))
        .then(() => gg())
        .then(()=> setIsLoaded(true))
    }, [dispatch]);

    console.log(properties)
    async function gg(){
        for(let i = 0; i < Object.entries(properties).length; i++){
            let index = Object.entries(properties)
            index[i][1]['coordinates'] = await getCoord(index[i][1].address, index[i][1].city, index[i][1].state, key)
        }
    }

    // useEffect(() => {
    //     gg()
    //     .then(() => setIsLoaded(true));
    // }, []);




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


    // async function filter(){
    //     setFilteredProp(
    //         properties.filter((prop)=> {
    //             return prop[1].id > 5
    //         })
    //     )
        
    // }

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
                            {Object.entries(properties).map((p)=> {
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
                        <label> Check In <input type='date' onChange={(e) => setCheckin(e.target.value)}></input></label>
                            <label>Check Out<input type='date' onChange={(e) => setCheckOut(e.target.value)}></input></label>
                            <label>Bedrooms<input type='number' placeholder='Bedrooms' onChange={(e) => setBedrooms(e.target.value)}></input></label>
                            <label>Bathrooms<input type='number' placeholder='Bathrooms' onChange={(e) => setBathrooms(e.target.value)}></input></label>
                            <label>Guests<input type='number' placeholder='Guests' onChange={(e) => setGuests(e.target.value)}></input></label>
                        
                        <button onClick={((e)=> {e.preventDefault(); console.log(checkIn, checkOut, bedrooms,bathrooms,guests)})}>Filter Properties</button>
                    </form>
                </div>

                <div className='resultHolder'>

                    <div className='rCardHold'>
                        {Object.entries(properties).map((property)=> {
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