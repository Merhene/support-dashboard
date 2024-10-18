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
      <EntityManager entityType="information" apiEndpoint="http://localhost:3020/information" />
      <Button
        imageSrc="/assets/inventory.png"
        altText="Inventaire Icon"
        buttonText="AJouter une information"
        onClick={handleButtonClick}
      />
      {showForm && <FormInfo />}
    </div>
  );
}

export default InfoPage;