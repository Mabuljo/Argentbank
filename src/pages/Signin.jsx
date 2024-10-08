import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../slices/login.slice';
import {useNavigate } from 'react-router-dom';

const Signin = () => {
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false); // État pour Remember Me
    const [ isFormSubmitted, setIsFormSubmitted] = useState(false); // État pour suivre la soumission du formulaire de connexion
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Récupérer les erreurs et l'état de connexion depuis Redux
    const { isConnected, error } = useSelector((state) => state.userLogin);

    const handleSubmit = (e) => {
        e.preventDefault();

        const loginData = {
            email: userEmail,
            password: password
        };

        dispatch(loginUser({loginData, rememberMe}));
        setIsFormSubmitted(true);
    };

     // Redirection vers la page "User" après la connexion réussie
     useEffect(() => {
        if (isConnected) {
            navigate('/user');
        }
    }, [isConnected, navigate]);

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" required value={userEmail} onChange={(e) => setUserEmail(e.target.value)} /> 
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} /> 
                    </div>
                    {/* Affichage du message d'erreur après une tentative de connexion */}
                    {isFormSubmitted && error && <p className="error">Email ou mot de passe incorrect</p>}
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button className="sign-in-button" type="submit">Sign In</button>
                </form>
            </section>
        </main>
    );
};

export default Signin;