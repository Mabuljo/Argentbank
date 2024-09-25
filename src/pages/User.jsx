import React, { useEffect } from 'react';
import Account from '../components/Account';
import { useSelector, useDispatch } from 'react-redux';
import FormEditName from '../components/FormEditName';
import { fetchUserByToken } from '../slices/user.slice';


const User = () => {
    // Récupérer les infos de l'utilisateur depuis l'état global de Redux
    const { firstName, lastName, userName} = useSelector((state) => state.user);
    const dispatch = useDispatch();

     // Fonction pour gérer le rafraichissement de la page et la persistance des infos utilisateur
     useEffect(() => {
        dispatch(fetchUserByToken());
      }, [dispatch]);

    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>Welcome back<br />{firstName} {lastName}!</h1>
                <button className="edit-button">Edit Name</button>
            </div>
            <FormEditName firstName={firstName} lastName={lastName} userName={userName}/>
            <h2 className="sr-only">Accounts</h2>
            <Account title="Argent Bank Checking (x8349)" amount="$2,082.79" description="Available Balance" />
            <Account title="Argent Bank Savings (x6712)" amount="$10,928.42" description="Available Balance" />
            <Account title="Argent Bank Credit Card (x8349)" amount="$184.30" description="Current Balance" />
        </main>
    );
};

export default User;