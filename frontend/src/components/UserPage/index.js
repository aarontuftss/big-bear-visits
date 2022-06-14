import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory, useParams } from "react-router-dom";
import './UserPage.css';
import userIcon from './userIcon.png'

import bedd from '../PropertyPage/bedIcon.png'
import bathh from '../PropertyPage/bathIcon.png'
import maxx from '../PropertyPage/maxPpl.png'


function UserPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const properties = useSelector((state) => state.properties.allProperties);
    const reservations = useSelector((state) => state.reservations.allReservations)

    const userProperties = Object.values(properties).filter((p)=> {
        return p.ownerId === sessionUser.id
    })

    const userReservations = Object.values(reservations).filter((r)=> {
        return r.renterId === sessionUser.id
    })

    const visitedProps = Object.values(properties).filter((p)=> {
        let test = false
        for(let i = 0; i < userReservations.length; i++){
            if(p.id === userReservations[i].propertyId) test = true
        }
        if (test) return p
    })

    const {userId} = useParams()

    if (!sessionUser) return <Redirect to="/login" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
    };


    if(sessionUser && sessionUser.id === parseInt(userId)){
        return (
            <>
            <div className="welcomeBanner">
                <h1>Welcome Back, {sessionUser.username}</h1>
                <img src={userIcon} alt=""></img>
            </div>

            <div className="profileWrap">
                <div className="top2">
                    <div className="topLeft">
                        <div className="topp">
                            <h1>My Properties</h1>
                            <div className="profileScroll">
                                {userProperties.map((p)=> {
                                    return (
                                        <>
                                            <div className="profileCard" onClick={()=> history.push(`/properties/${p.id}`)}>
                                                <img src={p.Images[1].link} alt=""></img>
                                                <div>
                                                    <h2>{p.name}</h2>
                                                    <div>
                                                        <p>{p.bedrooms} <img src={bedd} alt=""></img></p>
                                                        <p> {p.bathrooms} <img src={bathh} alt=""></img></p>
                                                        <p> {p.maxGuests} <img src={maxx} alt=""></img></p>
                                                    </div>
                                                        ${p.price} / night
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}

                            </div>
                        </div>
                        <div className="bottomm">
                

                        </div>
                    </div>

                    <div className="topRight">
                        <div className="topp">
                            <h1>My Reservations</h1>
                            <div className="profileScroll">
                                    {userReservations.map((r) => {
                                        const prop = visitedProps.filter((p)=> {return p.id === r.propertyId})
                                        console.log(prop[0])
                                        return (
                                            <>
                                                <div className="profileCard" onClick={() => history.push(`/reservations/${r.id}/${r.propertyId}`)}>
                                                    {/* {/* <img src={p.Images[1].link} alt=""></img> */}
                                                    <div>
                                                        <h1>{r.id}</h1>
                                                        {/* <h2>{prop[0].name? prop[0].name : 'error'}</h2> */}
                                                        {/* <h2>{prop[0].name}</h2> */}
                                                        {/* <div>
                                                            <p>{p.bedrooms} <img src={bedd} alt=""></img></p>
                                                            <p> {p.bathrooms} <img src={bathh} alt=""></img></p>
                                                            <p> {p.maxGuests} <img src={maxx} alt=""></img></p>
                                                        </div> */}
                                                        {/* ${prop[0].price} / night */}
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })}

                            </div>

                        </div>
                        <div className="bottomm">

                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }

    return (
       <div className="profileWrap">
           is not user
        </div>
    );
}

export default UserPage;