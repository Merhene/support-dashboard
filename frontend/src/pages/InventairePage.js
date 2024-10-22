import React, { useState } from 'react';
import EntityManager from '../components/EntityManager.js';
import FormInventaire from '../components/FormInventaire.js';
import Button from '../components/Button.js';

function InventairePage() {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <h2>Inventaire</h2>
      <Button
        imageSrc="/assets/inventory.png"
        altText="Inventaire Icon"
        buttonText="Ajouter du matériel"
        onClick={handleButtonClick}
      />
      {showForm && <FormInventaire />}
      <EntityManager entityType="inventory" apiEndpoint="http://localhost:3020/inventaire" />
    </div>
  );
}

export default InventairePage;
