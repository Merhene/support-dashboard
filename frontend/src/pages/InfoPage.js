import React, { useState } from 'react';
import EntityManager from '../components/EntityManager.js';
import FormInfo from '../components/FormInfo.js';
import Button from '../components/Button.js';

function InformationPage() {
  const [showInformationModal, setShowInformationModal] = useState(false);

  const handleOpenModal = () => setShowInformationModal(true);
  const handleCloseModal = () => setShowInformationModal(false);

  return (
    <div>
      <Button
        imageSrc="/assets/file.png"
        altText="Inventaire Icon"
        buttonText="Ajouter une information"
        onClick={handleOpenModal}
      />
      <FormInfo show={showInformationModal} onClose={handleCloseModal} />
      <EntityManager
        entityType="information"
        apiEndpoint="http://localhost:3020/information"
        FormComponent={FormInfo} // Assurez-vous que c'est bien défini ici
      />

    </div>
  );
}

export default InformationPage;