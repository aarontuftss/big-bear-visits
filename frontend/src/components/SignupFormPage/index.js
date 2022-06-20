import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

import { NavLink } from "react-router-dom";

import logo from '../Navigation/logooo.png'
import logo1 from '../Navigation/logo1.png'


function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to={`/users/${sessionUser.id}`} />;

    const handleValidations = () => {
        let errors = []
        const emailR = /^\S+@\S+\.\S+$/g

        // const passR = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g

        const passR = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g

        if(!email.match(emailR)) errors.push('Please provide a valid email')

        if(username.length > 50) errors.push('Username must be less than 50 characters')

        if (password.length > 200) errors.push('Password must be less than 200 characters')

        if (!password.match(passR)) errors.push('Password must be 8 characters, include 1 letter, 1 number, and a special character')


        
        return errors


    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let validations = handleValidations()

        if(validations.length){
            return setErrors(validations)
        }else{
            if (password === confirmPassword) {
                setErrors([]);
                return dispatch(sessionActions.signup({ email, username, password }))
                    .catch(async (res) => {
                        const data = await res.json();
                        if (data && data.errors) setErrors(data.errors);
                    });
            }
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    const handleDemo = (e) => {
        e.preventDefault();
        return dispatch(sessionActions.login({credential:'demo@user.io', password:'password'}))
    }

    return (
        <>
        <div className='fBG'>
            <div className='login-hero signup-hero'>
                <div className='logoHold'>
                    <NavLink exact to="/"><img src={logo1} alt='' className='logo1'></img></NavLink>
                    <NavLink exact to="/"><img src={logo} alt='' className='logo'></img></NavLink>
                </div>
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <label>
                        Email
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Username
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                    <label>
                        Confirm Password
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </label>
                </form>
                <button onClick={handleSubmit} className='logB'>Sign Up</button>
                <button onClick={handleDemo} className='logB'>Demo User</button>
                <NavLink to={'/login'}>Already a member?</NavLink>
            </div>
        </div>
        </>
    );
}

export default SignupFormPage;