import React, { useState } from 'react';
import '../styles/Form.css';

function FormInventaire() {
  const [name, setName] = useState('');
  const [materialType, setMaterialType] = useState('');
  const [isPresent, setIsPresent] = useState(true);
  const [flashMessage, setFlashMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMaterial = {
      name,
      material_type: materialType,
      is_present: isPresent,
    };

    try {
      const response = await fetch('http://localhost:3020/inventaire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMaterial),
      });

      if (response.ok) {
        setName('');
        setMaterialType('');
        setIsPresent(true);
        setFlashMessage('Matériel ajouté avec succès!');
      } else {
        setFlashMessage('Erreur lors de l\'ajout du matériel.');
      }
    } catch (err) {
      console.error('Erreur lors de l\'ajout du matériel :', err);
      setFlashMessage('Erreur lors de l\'ajout du matériel.');
    }

    // Masquer le message flash après 3 secondes
    setTimeout(() => setFlashMessage(null), 3000);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom du matériel :</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Type de matériel :</label>
          <input
            type="text"
            value={materialType}
            onChange={(e) => setMaterialType(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Présent :</label>
          <input
            type="checkbox"
            checked={isPresent}
            onChange={(e) => setIsPresent(e.target.checked)}
          />
        </div>
        <button type="submit">Ajouter Matériel</button>
      </form>

      {flashMessage && <div className="flash-message">{flashMessage}</div>}
    </div>
  );
}

export default FormInventaire;