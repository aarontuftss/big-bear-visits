import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';

import logo from '../Navigation/logooo.png'
import logo1 from '../Navigation/logo1.png'


import './LoginForm.css';

function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to={`/users/${sessionUser.id}`} />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    return (
        <div className='fBG'>
            <div className='login-hero'>
                <div className='logoHold'>
                    <NavLink exact to="/"><img src={logo1} alt='' className='logo1'></img></NavLink>
                    <NavLink exact to="/"><img src={logo} alt='' className='logo'></img></NavLink>
                </div>
                <h1>Log In</h1>
                <form onSubmit={handleSubmit}>
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <label>
                        Username or Email
                        <input
                            type="text"
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Password
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                </form>
                    <button onClick={handleSubmit} className='logB'>Log In</button>
                    <NavLink to={'/signup'}>Not a member yet?</NavLink>
            </div>
        </div>
    );
}

export default LoginFormPage;