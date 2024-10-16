import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Button.css'; // On stylise le bouton dans un fichier CSS séparé

function Button({ imageSrc, altText, buttonText, to }) {
  return (
    <Link to={to} className="custom-button">
      <img src={imageSrc} alt={altText} className="button-image" />
      <span className="button-text">{buttonText}</span>
    </Link>
  );
}

export default Button;
