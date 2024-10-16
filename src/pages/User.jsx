import React, { useEffect, useState } from 'react';
import Account from '../components/Account';
import { useSelector, useDispatch } from 'react-redux';
import FormEditName from '../components/FormEditName';
import { fetchUserByToken } from '../slices/user.slice';

const User = () => {
    const dispatch = useDispatch();
    const { firstName, lastName } = useSelector((state) => state.user); // Récupére les infos du user depuis l'état global de Redux
    const [isEditing, setIsEditing] = useState(false);

    // Fonction pour gérer le rafraichissement de la page et la persistance des infos utilisateur
    useEffect(() => {
    dispatch(fetchUserByToken());
    }, [dispatch,]);
    
    const handleEditForm = () => {
        setIsEditing(true);
    }

    return (
        <main className="main bg-dark">
            {isEditing ? (
                <FormEditName onCancel={() => setIsEditing(false)}/>
            ) : (
                <div className="header">
                    <h1>Welcome back<br />{firstName} {lastName}!</h1>
                    <button className="edit-button" onClick={handleEditForm}>Edit Name</button>
                </div>
            )}
            <h2 className="sr-only">Accounts</h2>
            <Account title="Argent Bank Checking (x8349)" amount="$2,082.79" description="Available Balance" />
            <Account title="Argent Bank Savings (x6712)" amount="$10,928.42" description="Available Balance" />
            <Account title="Argent Bank Credit Card (x8349)" amount="$184.30" description="Current Balance" />
        </main>
    );
};

export default User;