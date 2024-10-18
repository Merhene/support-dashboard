import React, { useState } from 'react';
import EntityManager from '../components/EntityManager.js';
import FormDocumentation from '../components/FormDocumentation.js';
import Button from '../components/Button.js';

function DocumentationPage() {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <h2>Documentation</h2>
      <EntityManager entityType="documentation" apiEndpoint="http://localhost:3020/documentation" />
      <Button
        imageSrc="/assets/file.png"
        altText="Documentation Icon"
        buttonText="Ajouter Documentation"
        onClick={handleButtonClick}
      />
      {showForm && <FormDocumentation />}
    </div>
  );
}

export default DocumentationPage;
