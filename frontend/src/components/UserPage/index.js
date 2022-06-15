import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory, useParams } from "react-router-dom";
import './UserPage.css';
import userIcon from './userIcon.png'
import * as sessionActions from '../../store/session';

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
        p['profit'] = 0
        return p.ownerId === sessionUser.id
    })

    const userReservations = Object.values(reservations).filter((r)=> {
        return r.renterId === sessionUser.id
    })

    const profitReservations = Object.values(reservations).map((r)=> {
        for(let i = 0 ; i < userProperties.length ; i++){
            if(r.propertyId === userProperties[i].id){
                let dif_time = new Date(r.endDate).getTime() - new Date(r.startDate).getTime()
                dif_time = dif_time / (1000 * 3600 * 24)
                let profit = dif_time * userProperties[i].price
                if (userProperties[i].profit) userProperties[i].profit = userProperties[i].profit + profit
                else userProperties[i]['profit'] = profit
                return r
            }
        }
    })

    useEffect(()=> {
        console.log( userProperties )
    }, [])


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

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push('/')
    };


    if(sessionUser && sessionUser.id === parseInt(userId)){
        return (
            <>
            <div className="welcomeBanner">
                <h1>Welcome Back, {sessionUser.username}</h1>
                <img src={userIcon} alt=""></img>
                <button onClick={logout} className='logoutB'>Log Out</button>
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
                                hello

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
                                                <div className="resCard" onClick={() => history.push(`/reservations/${r.id}/${r.propertyId}`)}>
                                                    <img src={prop[0]?.Images[1]?.link} alt="" className="resImg"></img> 
                                                    <div>
                                                        <h1>{prop[0].name} - {r.startDate.split('T')[0]}</h1>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }).reverse()}

                            </div>

                        </div>
                        <div className="bottomm">
                                hello
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