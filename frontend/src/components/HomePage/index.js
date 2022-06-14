import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';

import './HomePage.css';
import arrow from './arrow.png'

function HomePage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);


    return (
        <>
        <div className='homePage-main'>
            <div className='mainBG'>
                <div className='mid'>
                    <NavLink to={`/search`}>
                        <div className='centerBook'>
                            <p>Check Availability</p>
                            <img src={arrow} alt='' className='arrow1'></img>
                        </div>
                    </NavLink>
                </div>
                <h2>Plan your next trip to beautiful Big Bear Lake, California</h2>

            </div>
            <div className='homeCardContainer'>
                <div className='homeCard'>
                    <img  src={''} alt=''></img>
                    <p>test</p>
                    <p>test</p>
                </div>

                <div className='homeCard'>
                    <img src={''} alt=''></img>
                    <p>test</p>
                    <p>test</p>
                </div>

                <div className='homeCard'>
                    <img src={''} alt=''></img>
                    <p>test</p>
                    <p>test</p>
                </div>

                <div className='homeCard'>
                    <img src={''} alt=''></img>
                    <p>test</p>
                    <p>test</p>
                </div>

            </div>


        </div>
        </>
)}

export default HomePage;