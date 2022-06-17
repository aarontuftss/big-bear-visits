import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';

import loaderGif from '../SearchPage/mapLoader.gif'

import './About.css';

function AboutPage(props) {
    const dispatch = useDispatch();
    const history = useHistory()

    const [isLoaded, setIsLoaded] = useState(false)

    const sessionUser = useSelector(state => state.session.user);





    useEffect(() => {
        dispatch(sessionActions.restoreUser())
            .then(() => setIsLoaded(true));
    }, [dispatch]);



    if (!isLoaded) {
        return (
            <div className='loaderr'>
                <img src={loaderGif} alt=''></img>
            </div>
        )
    }


    return (
        <>
            {isLoaded && (
                <div className='about-hero'>
                    
                </div>
            )}
        </>
    )
}

export default AboutPage;