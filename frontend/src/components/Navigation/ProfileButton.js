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
                <NavLink to={`/properties/new`} className='searchB'><h4>Upload Home</h4></NavLink>
                <NavLink to={`/users/${user.id}`} className='searchB1'><h4 className="signUp">Profile</h4></NavLink>
            </div>
        </>
    );
}

export default ProfileButton;
