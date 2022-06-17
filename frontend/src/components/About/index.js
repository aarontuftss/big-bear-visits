import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import loaderGif from '../SearchPage/mapLoader.gif'

import css from './css3.png'
import html from './html.png'
import javascript from './javascript.png'
import postgresql from './postgresql.png'
import reactImg from './react.png'
import redux from './redux.png'
import sequelize from './sequelize.png'

import linkedin from './linkedin.png'
import github from './github.png'
import website from './website.png'

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
                    <div className='about-main'>
                        <div className='linkHold'>
                            <div className='languageHold1'>
                                <a href='https://github.com/jonathontufts' target="_blank"><img src={github} alt=''></img></a>
                                {/* <a href='https://github.com/jonathontufts' target="_blank"><img alt='' src={website}></img></a> */}
                                <a href='https://www.linkedin.com/in/aaron-tufts-010759219/' target="_blank"><img src={linkedin} alt=''></img></a>
                            </div>
                        </div>
                        <div className='aboutD'>
                            <h1>Aaron Tufts - Full Stack Engineer</h1>
                            <h3>Salt Lake City, Utah</h3>
                        </div>
                        <div className='textArea'>
                            <p>Thank you for viewing Big Bear Visits, I had a ton of fun working on this project.</p>
                            <p>Big Bear Visits was created using HTML, CSS, Javascript, React.JS, Redux, PostgreSQL, and Sequelize. Feel free to click the social icons above to view my GitHub, LinkedIn, and other projects.</p>

                        </div>
                        <div className='languageHold'>
                            <img alt='' src={html}></img>
                            <img alt='' src={css}></img>
                            <img alt='' src={javascript}></img>
                            <img alt='' src={reactImg}></img>
                            <img alt='' src={redux}></img>
                            <img alt='' src={postgresql}></img>
                            <img alt='' src={sequelize}></img>
                        </div>
                    </div>
                    
                </div>
            )}
        </>
    )
}

export default AboutPage;