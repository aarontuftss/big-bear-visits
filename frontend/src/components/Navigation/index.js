import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from './logooo.png'
import logo1 from './logo1.png'

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const weather = useSelector(state => state.weather.current)

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

            <div className='navMid'>
                <img src={weather?.condition.icon} alt=''></img>
                <h2>{weather?.condition.text}</h2>
                <h2>{weather?.temp_f}℉</h2>
            </div>

            <div className='navS'>
                <NavLink to={`/search`}> Search </NavLink>
                {isLoaded && sessionLinks}
            </div>
        
        </div>
        </>
    );
}

export default Navigation;

