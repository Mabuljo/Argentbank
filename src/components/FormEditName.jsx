import React from 'react';

const FormEditName = ({firstName, lastName, userName}) => {
    return (
        <div className="header">
            <h1>Edit user info</h1>
            <form className="formName">
                <div className="inputName">
                    <label htmlFor="username" value= {userName}>User name :</label>
                    <input type="text" id="username" /> 
                </div>
                <div className="inputName">
                    <label htmlFor="firstname"value= {firstName}>First name :</label>
                    <input type="text" id="firstname" readOnly /> 
                </div>
                <div className="inputName">
                    <label htmlFor="lastname" value= {lastName}>Last name :</label>
                    <input type="text" id="lastname" readOnly /> 
                </div>
                <div button className="buttonEditName">
                    <button className="edit-button buttonForm" type="submit">Save</button>
                    <button className="edit-button buttonForm">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default FormEditName;