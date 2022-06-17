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
    const [filteredProp, setFilteredProp] = useState(Object.entries(properties))
    const key = useSelector(state => state.key)
    const reservations = useSelector(state => state.reservations.allReservations)


    const history = useHistory()

    const [isLoaded, setIsLoaded] = useState(false);


    const [checkIn, setCheckin] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [bedrooms, setBedrooms] = useState(0)
    const [bathrooms, setBathrooms] = useState(0)
    const [guests, setGuests] = useState(0)


    useEffect(() => {
        
    }, [filteredProp]);

    useEffect(() => {
        filter()
    }, [checkIn, checkOut, bedrooms, bathrooms, guests]);

    useEffect(() => {
        dispatch(sessionActions.restoreUser())
        .then(() => dispatch(propertyActions.getAllProperties()))
        .then(() => gg())
        .then(()=> setIsLoaded(true))
    }, [dispatch]);

    async function gg(){
        for(let i = 0; i < Object.entries(properties).length; i++){
            let index = Object.entries(properties)
            index[i][1]['coordinates'] = await getCoord(index[i][1].address, index[i][1].city, index[i][1].state, key)
        }
    }


    if (!isLoaded){
        return (
            <>
            <div className='loaderr'>
                <img src={loaderGif} alt=''></img>
            </div>
            </>
        )
    }

    function inbetweens(start, end) {
        for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
            
            arr.push(new Date(dt));
        }
        return arr
    }


    async function filter(){
        setFilteredProp(
            Object.entries(properties).filter((prop)=> {
                let bookedDays = Object.entries(prop[1].Reservations).map((r)=> {return inbetweens(r[1].startDate, r[1].endDate)}).flat()
                // let selectedDays = inbetweens(checkIn, checkOut)

                if (bookedDays.includes(checkIn)) return false
                if (bookedDays.includes(checkOut)) return false


                if (prop[1].bathrooms < bathrooms) return false

                if (prop[1].bedrooms < bedrooms) return false

                if (prop[1].maxGuests < guests) return false

                return true
            })
        )
        
    }


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
                            {/* {Object.entries(properties).map((p)=> {
                                return (
                                    <Marker key={p[1].name} position={p[1].coordinates} url={`/propertyies/${p[1].id}`} clickable={true} onClick={()=> history.push(`/properties/${p[1].id}`)}/>
                                )
                            })} */}
                        {filteredProp.map((p) => {
                            return (
                                <Marker key={p[1].name} position={p[1].coordinates} url={`/propertyies/${p[1].id}`} clickable={true} onClick={() => history.push(`/properties/${p[1].id}`)} />
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
                    {/* <p style={{margin: '0px'}}>Find Exactly What You Need</p> */}
                    <form className='sForm'>
                        <label> Check In <input type='date' onChange={(e) => {setCheckin(e.target.value); }}></input></label>
                            <label>Check Out<input type='date' onChange={(e) => {setCheckOut(e.target.value);  }}></input></label>
                            <label>Bedrooms<input type='number' placeholder='# of Bedrooms' onChange={(e) => {setBedrooms(e.target.value);}}></input></label>
                            <label>Bathrooms<input type='number' placeholder='# of Bathrooms' onChange={(e) => {setBathrooms(e.target.value); }}></input></label>
                            <label>Guests<input type='number' placeholder='# of Guests' onChange={(e) => {setGuests(e.target.value);  }}></input></label>
                        
                        {/* <button onClick={((e)=> {e.preventDefault(); filter()})}>Update Properties</button> */}
                    </form>
                </div>

                <div className='resultHolder'>

                    <div className='rCardHold'>
                        {/* {Object.entries(properties).map((property)=> {
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
                        })} */}
                            {filteredProp.map((property) => {
                                const image = property[1]?.Images[0].link ? property[1].Images[0].link : "https://www.destinationbigbear.com/media/images/HiddenWolfRetreat/2000/00100.jpg"
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