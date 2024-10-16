import React, { useState } from 'react';
import '../styles/Form.css';

function FormDocumentation() {
  const [nameDocumentation, setNameDocumentation] = useState('');
  const [linkDocumentation, setLinkDocumentation] = useState('');
  const [flashMessage, setFlashMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newDocumentation = {
      name_solution: nameDocumentation,  // Réutilisation du même champ dans la table
      link_solution: linkDocumentation,  // Réutilisation du même champ
    };

    try {
      const response = await fetch('http://localhost:3020/documentation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDocumentation),
      });

      if (response.ok) {
        setNameDocumentation('');
        setLinkDocumentation('');
        setFlashMessage('Documentation ajoutée avec succès!');
      } else {
        setFlashMessage('Erreur lors de l\'ajout de la documentation.');
      }
    } catch (err) {
      console.error('Erreur lors de l\'ajout de la documentation :', err);
      setFlashMessage('Erreur lors de l\'ajout de la documentation.');
    }

    // Masquer le message flash après 3 secondes
    setTimeout(() => setFlashMessage(null), 3000);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom de la documentation :</label>
          <input
            type="text"
            value={nameDocumentation}
            onChange={(e) => setNameDocumentation(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Lien de la documentation :</label>
          <input
            type="url"
            value={linkDocumentation}
            onChange={(e) => setLinkDocumentation(e.target.value)}
            required
          />
        </div>
        <button type="submit">Ajouter Documentation</button>
      </form>

      {flashMessage && <div className="flash-message">{flashMessage}</div>}
    </div>
  );
}

export default FormDocumentation;
