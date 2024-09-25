import React, { useEffect } from 'react';
import bankLogo from '../assets/img/argentBankLogo.webp';
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserByToken, logout } from '../slices/user.slice';

const Header = () => {
    const dispatch = useDispatch();
    const {isConnected, userName } = useSelector(state => state.user); // État de connexion depuis le user

    // Fonction pour gérer la déconnexion
    const handleLogout = () => {
        dispatch(logout());  // Action pour mettre à jour l'état global de l'utilisateur
    };

    // Fonction pour gérer le rafraichissement de la page et la persistance des infos utilisateur
    useEffect(() => {
        dispatch(fetchUserByToken());
      }, [dispatch]);
    
    return (
        <header>
            <nav className="main-nav">
                <NavLink to="/" className="main-nav-logo">
                    <img
                    className="main-nav-logo-image"
                    src={bankLogo}
                    alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </NavLink>
                <div>
                    {/* Afficher le contenu en fonction de l'état de connexion */}
                    {isConnected ? (
                        <>
                            <NavLink to="/user" className="main-nav-item">
                                <i className="fa fa-user-circle"></i>
                                <span> {userName}</span>
                            </NavLink>
                            <NavLink to="/" onClick={handleLogout} className="main-nav-item">
                                <i className="fa fa-sign-out"></i>
                                <span> Sign Out</span>
                            </NavLink>
                        </>
                    ) : (
                        <NavLink to="/signin" className="main-nav-item">
                            <i className="fa fa-user-circle"></i>
                            <span> Sign In</span>
                        </NavLink>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
