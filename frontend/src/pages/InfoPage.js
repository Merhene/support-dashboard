import React, { useState } from 'react';
import EntityManager from '../components/EntityManager.js';
import FormInfo from '../components/FormInfo.js';
import Button from '../components/Button.js';

function InfoPage() {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <h2>Info Pratique</h2>
      <Button
        imageSrc="/assets/inventory.png"
        altText="Inventaire Icon"
        buttonText="Ajouter une information"
        onClick={handleButtonClick}
      />
      {showForm && <FormInfo />}
      <EntityManager entityType="information" apiEndpoint="http://localhost:3020/information" />
    </div>
  );
}

export default InfoPage;