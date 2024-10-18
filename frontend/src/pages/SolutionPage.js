import React, { useState } from 'react';
import EntityManager from '../components/EntityManager.js';
import FormSolution from '../components/FormSolution.js';
import Button from '../components/Button.js';

function SolutionPage() {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <h2>Solutions</h2>
      <EntityManager entityType="solution" apiEndpoint="http://localhost:3020/solution" />
      <Button
        imageSrc="/assets/solution.png"
        altText="Solution Icon"
        buttonText="Ajouter Solution"
        onClick={handleButtonClick}
      />
      {showForm && <FormSolution />}
    </div>
  );
}

export default SolutionPage;
