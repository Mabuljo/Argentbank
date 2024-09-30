import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserName } from '../slices/userUpdate.slice';

const FormEditName = ({ onCancel }) => {
    const dispatch = useDispatch();
    // Récupérer les informations de l'utilisateur depuis le store Redux
    const { firstName, lastName, userName } = useSelector((state) => state.user);
    const { updateSuccess, updateError } = useSelector((state) => state.userUpdate);
    const [newUserName, setNewUserName] = useState(userName);

    // useEffect pour initialiser newUserName à l'ouverture du formulaire
    useEffect(() => {
        setNewUserName(userName); // Initialise avec le userName actuel
    }, [userName]); // Ne s'exécute que lorsque userName change

    // Utiliser useEffect pour vérifier updateSuccess
    useEffect(() => {
        if (updateSuccess){
            onCancel(); // pour revenir à la div "welcome"
        }
    }, [updateSuccess, onCancel]);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        await dispatch(updateUserName({ newUserName }));
    }
    
    return (
        <div className="header">
            <h1>Edit user info</h1>
            <form className="formName" onSubmit={handleSubmit}>
                <div className="inputName">
                    <label htmlFor="username">User name :</label>
                    <input type="text" id="username" value= {newUserName} onChange={(e) => setNewUserName(e.target.value)}/> 
                </div>
                <div className="inputName">
                    <label htmlFor="firstname">First name :</label>
                    <input className="inputReadOnly" type="text" id="firstname" value= {firstName} readOnly /> 
                </div>
                <div className="inputName">
                    <label htmlFor="lastname" >Last name :</label>
                    <input className="inputReadOnly" type="text" id="lastname" value= {lastName} readOnly /> 
                </div>
                <div className="buttonEditName">
                    <button className="edit-button buttonForm" type="submit">Save</button>
                    <button className="edit-button buttonForm" onClick={onCancel}>Cancel</button>
                </div>
                {updateError && <p className="error">Une erreur est survenue</p>} 
            </form>
        </div>
    );
};

export default FormEditName;