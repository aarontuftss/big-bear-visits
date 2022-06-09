import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import {NavLink} from 'react-router-dom'

function ProfileButton({ user }) {
    const dispatch = useDispatch();


    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <>
            <div className="userBHold">
                <NavLink to={`/properties/new`}>Upload Home</NavLink>
                <NavLink to={`/users/${user.id}`}>Profile</NavLink>
                <button onClick={logout}>Log Out</button>
            </div>
        </>
    );
}

export default ProfileButton;
