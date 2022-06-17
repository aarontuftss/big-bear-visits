import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory, useParams } from "react-router-dom";
import './UserPage.css';
import userIcon from './userIcon.png'
import * as sessionActions from '../../store/session';
import * as reservationActions from '../../store/reservation';
import * as propertyActions from '../../store/property';



import bedd from '../PropertyPage/bedIcon.png'
import bathh from '../PropertyPage/bathIcon.png'
import maxx from '../PropertyPage/maxPpl.png'
import Chart from "./chart";

import loadGif from '../SearchPage/mapLoader.gif'


function UserPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const properties = useSelector((state) => state.properties.allProperties);
    const reservations = useSelector((state) => state.reservations.allReservations)

    const [isLoaded, setIsLoaded] = useState(false)

    function inbetweens(start, end) {
        for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
            arr.push(new Date(dt));
        }
        return arr
    }

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

    const totalProfit = () => {
        let total = 0
        for(let i = 0 ; i < userProperties.length ; i++){
            total += userProperties[i].profit
        }
        return total

    }

    const averageProp = () => {
        let total = 0
        for (let i = 0; i < userProperties.length; i++) {
            total += userProperties[i].profit
        }
        return Math.floor(total / userProperties.length)
    }

    const averageRes = () => {
        let total = totalProfit()

        return Math.floor(total/profitReservations.length)
    }

    useEffect(()=> {
        dispatch(propertyActions.getAllProperties())
        .then(()=> dispatch(reservationActions.getAllReservations()))
        .then(()=> setIsLoaded(true))
    }, [dispatch])


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

    if(!isLoaded){
        return (
            <div className="loaderr">
                <img src={loadGif} alt="loader"></img>
            </div>
        )
    }


    if(isLoaded && sessionUser && sessionUser.id === parseInt(userId)){
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
                                        <div className="profileCard" onClick={()=> history.push(`/properties/${p.id}`)} key={p?.id}>
                                            <img src={p.Images[0]?.link} alt=""></img>
                                            <div>
                                                <h3>{p.name}</h3>
                                                <div>
                                                    <p>{p.bedrooms} <img src={bedd} alt=""></img></p>
                                                    <p> {p.bathrooms} <img src={bathh} alt=""></img></p>
                                                    <p> {p.maxGuests} <img src={maxx} alt=""></img></p>
                                                </div>
                                                    ${p.price} / night
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>
                        </div>
                        <div className="bottomm">
                            <Chart properties={userProperties} />

                        </div>
                    </div>

                    <div className="topRight">
                        <div className="topp">
                            <h1>My Reservations</h1>
                            <div className="profileScroll">
                                    {userReservations.map((r) => {
                                        const prop = visitedProps.filter((p)=> {return p.id === r.propertyId})
                                        
                                        return (
                                            <div className="resCard" onClick={() => history.push(`/reservations/${r.id}/${r.propertyId}`)} key={r?.id}>
                                                <img src={prop[0]?.Images[1]?.link} alt="" className="resImg"></img> 
                                                <div>
                                                    <h3>{prop[0]?.name} - {r.startDate.split('T')[0]}</h3>
                                                </div>
                                            </div>
                                        )
                                    }).reverse()}

                            </div>

                        </div>
                        <div className="bottomm1">
                                <h2>Basic Information</h2>
                                <div className="statHoldd">
                                    <p>Total Properties: {userProperties.length}</p>
                                    <p>Booked Reservations: {userReservations.length}</p>
                                    <p>Sold Reservations: {profitReservations.length}</p>
                                    <p>Total Income: ${totalProfit()}</p>
                                    <p>Average Property Income: ${averageProp()}</p>
                                    <p>Average Reservation Income ${averageRes()}</p>

                                </div>
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