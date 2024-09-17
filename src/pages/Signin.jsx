import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { loginUser } from '../slices/user.slice';

const Signin = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const loginData = {
            email: userName,
            password: password
        };

        dispatch(loginUser(loginData));
        console.log(loginData);
    };

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" required value={userName} onChange={(e) => setUserName(e.target.value)} /> 
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} /> 
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button className="sign-in-button" type="submit">Sign In</button>
                </form>
            </section>
        </main>
    );
};

export default Signin;