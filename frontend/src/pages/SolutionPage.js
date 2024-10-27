import React, { useState } from 'react';
import EntityManager from '../components/EntityManager.js';
import FormSolution from '../components/FormSolution.js';
import Button from '../components/Button.js';

function SolutionPage() {
  const [showSolutionModal, setShowSolutionModal] = useState(false);

  const handleOpenModal = () => setShowSolutionModal(true);
  const handleCloseModal = () => setShowSolutionModal(false);

  return (
    <div>
      <Button 
        imageSrc="/assets/solution.png" 
        altText="Ajouter une Solution" 
        buttonText="Ajouter Solution" 
        onClick={handleOpenModal} 
      />
      <FormSolution show={showSolutionModal} onClose={handleCloseModal} />
      <EntityManager
  entityType="solution"
  apiEndpoint="http://localhost:3020/solution"
  FormComponent={FormSolution} // Assurez-vous que c'est bien défini ici
/>

    </div>
  );
}

export default SolutionPage;
