import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const { token } = useSelector(state => state.user);

    // Vérifie si le token est présent dans le state ou dans le storage
    const isAuthenticated = token || localStorage.getItem('token') || sessionStorage.getItem('token');

    // Si l'utilisateur n'est pas authentifié, il est redirigé vers la page de connexion
    return isAuthenticated ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;