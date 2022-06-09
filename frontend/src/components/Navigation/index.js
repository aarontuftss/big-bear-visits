import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from './logooo.png'
import logo1 from './logo1.png'
import arrow from './arrow.png'

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                <NavLink to="/login" className='authB'>Log In</NavLink>
                <NavLink to="/signup" className='authB'>Sign Up</NavLink>
            </>
        );
    }

    return (
        <>
        <div className='navBar'>
            <div className='logoHold navS'>
                <NavLink exact to="/"><img src={logo1} alt='' className='logo1'></img></NavLink>
                <NavLink exact to="/"><img src={logo} alt='' className='logo'></img></NavLink>
            </div>

            <div className='mid'>
                <NavLink to={`/search`}>
                <div className='centerBook'>
                    <p>Check Availability</p>
                    <img src={arrow} alt='' className='arrow1'></img>
                </div>
                </NavLink>
            </div>

            <div className='navS'>
                {isLoaded && sessionLinks}
            </div>
        
        </div>
        </>
    );
}

export default Navigation;

