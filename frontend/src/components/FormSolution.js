import React, { useState } from 'react';
import '../styles/Form.css';

function FormSolution() {
  const [nameSolution, setNameSolution] = useState('');
  const [linkSolution, setLinkSolution] = useState('');
  const [flashMessage, setFlashMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSolution = {
      name_solution: nameSolution,
      link_solution: linkSolution,
    };

    try {
      const response = await fetch('http://localhost:3020/solution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSolution),
      });

      if (response.ok) {
        setNameSolution('');
        setLinkSolution('');
        setFlashMessage('Solution ajoutée avec succès!');
      } else {
        setFlashMessage('Erreur lors de l\'ajout de la solution.');
      }
    } catch (err) {
      console.error('Erreur lors de l\'ajout de la solution :', err);
      setFlashMessage('Erreur lors de l\'ajout de la solution.');
    }

    // Masquer le message flash après 3 secondes
    setTimeout(() => setFlashMessage(null), 3000);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom de la solution :</label>
          <input
            type="text"
            value={nameSolution}
            onChange={(e) => setNameSolution(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Lien de la solution :</label>
          <input
            type="url"
            value={linkSolution}
            onChange={(e) => setLinkSolution(e.target.value)}
            required
          />
        </div>
        <button type="submit">Ajouter Solution</button>
      </form>

      {flashMessage && <div className="flash-message">{flashMessage}</div>}
    </div>
  );
}

export default FormSolution;
