import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import {NavLink, useHistory} from 'react-router-dom'

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const history = useHistory()


    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push('/')
    };

    return (
        <>
            <div className="userBHold">
                <NavLink to={`/properties/new`} className='uploadB'>Upload Home</NavLink>
                <NavLink to={`/users/${user.id}`} className='profileB'>Profile</NavLink>
                <button onClick={logout} className='logoutB'>Log Out</button>
            </div>
        </>
    );
}

export default ProfileButton;
