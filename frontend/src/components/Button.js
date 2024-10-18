import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Button.css'; // On stylise le bouton dans un fichier CSS séparé

function Button({ imageSrc, altText, buttonText, to, onClick }) {
  return (
    <div>
      {/* Si `onClick` est fourni, c'est un bouton, sinon un lien */}
      {onClick ? (
        <button onClick={onClick} className="action-button">
          <img src={imageSrc} alt={altText} className="button-image" />
          <span className="button-text">{buttonText}</span>
        </button>
      ) : (
        <Link to={to} className="link-button">
          <img src={imageSrc} alt={altText} className="button-image" />
          <span className="button-text">{buttonText}</span>
        </Link>
      )}
    </div>
  );
}

export default Button;
