import React, { useState } from 'react';

function FormGeneric({ formFields, apiEndpoint, successMessage, errorMessage }) {
  const [formData, setFormData] = useState({});
  const [flashMessage, setFlashMessage] = useState(null);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value, // Gérer la checkbox
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFlashMessage(successMessage);
        setFormData({}); // Réinitialiser les données du formulaire
      } else {
        setFlashMessage(errorMessage);
      }
    } catch (err) {
      console.error('Erreur :', err);
      setFlashMessage(errorMessage);
    }

    // Masquer le message flash après 3 secondes
    setTimeout(() => setFlashMessage(null), 3000);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {formFields.map((field, index) => (
          <div key={index}>
            <label>{field.label} :</label>

            {/* Gérer différents types d'input, y compris checkbox */}
            {field.type === 'checkbox' ? (
              <input
                type="checkbox"
                name={field.name}
                checked={!!formData[field.name]} // Gérer l'état des checkbox
                onChange={handleChange}
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                required={field.required}
              />
            )}
          </div>
        ))}
        <button type="submit">Ajouter</button>
      </form>

      {flashMessage && <div className="flash-message">{flashMessage}</div>}
    </div>
  );
}

export default FormGeneric;
