import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './HomePage.css';

function HomePage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);


    return (
        <>
        <div className='homePage-main'>
            <div className='mainBG'>
                <form>
                    <input type='date'></input>
                    <input type='date'></input>
                    <input type='number' placeholder='# of guests'></input>
                </form>
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