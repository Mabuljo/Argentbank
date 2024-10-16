import {useEffect} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { isConnected } = useSelector((state) => state.user); // Vérifie si l'utilisateur est connecté
    const navigate = useNavigate()

    useEffect(() => {
        if (!isConnected) {
            // Si l'utilisateur n'est pas connecté, redirige vers la page de connexion
            navigate('/signin');
        }
    }, [isConnected, navigate]);

    // Si l'utilisateur est connecté, retourne les enfants
    return children; 

    };
export default ProtectedRoute;