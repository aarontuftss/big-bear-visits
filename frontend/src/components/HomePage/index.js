import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';

import './HomePage.css';
import arrow from './arrow.png'
import bgVid from './BigBearSpringBanner.mp4'
import cabin from './cabin.png'
import money from './money.png'
import fun from './fun.png'
import about from './about.png'

function HomePage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);


    return (
        <>
        <div className='homePage-main'>
            <video src={bgVid} autoPlay loop muted className='bgVidd'/>
            <div className='overlayy'></div>
            <div className='mainBG'>
                <h1>Plan your next trip to beautiful Big Bear Lake, California</h1>
                <div className='mid'>
                    <NavLink to={`/search`}>
                        <div className='centerBook'>
                            <p>Check Availability</p>
                            <img src={arrow} alt='' className='arrow1'></img>
                        </div>
                    </NavLink>
                </div>

            </div>
            <div className='homeCardContainer'>
                <NavLink to={'/search'}><div className='homeCard'>
                    <img  src={cabin} alt=''></img>
                    <p>Create the Perfect Vacation</p>
                    <p>Browse & filter through all properties.. Find exactly what you need.</p>
                    </div></NavLink>

                <NavLink to={`/properties/new`}><div className='homeCard'>
                    <img src={money} alt=''></img>
                    <p>Upload A Property</p>
                    <p>Rent your home on our platform & help create new memories for visitors!</p>
                    </div></NavLink>

                    <a href={'https://www.bigbear.com/things-to-do/summer/'} target='_blank'><div className='homeCard'>
                    <img src={fun} alt=''></img>
                    <p>Things To Do</p>
                    <p>Browse Big Bear's official website for a list of summer activities going on</p>
                </div></a>

                <NavLink to={'/about'}><div className='homeCard'>
                    <img src={about} alt=''></img>
                    <p>About</p>
                    <p>Hi, learn about the developer & this project. Thank you for visiting !</p>
                    </div></NavLink>

            </div>


        </div>
        </>
)}

export default HomePage;