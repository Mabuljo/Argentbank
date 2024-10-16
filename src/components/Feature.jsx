import React from 'react';

const Feature = ({img, title, text}) => {
    return (
        <div className="feature-item">
          <img src={img} alt="Icon" className="feature-icon" />
          <h3 className="feature-item-title">{title}</h3>
          <p>{text}</p>
        </div>
    );
};

export default Feature;