import React, { useState } from 'react';
import EntityManager from '../components/EntityManager.js';
import FormInventaire from '../components/FormInventaire.js';
import Button from '../components/Button.js';

function InventairePage() {
  const [showInventaireModal, setShowInventaireModal] = useState(false);

  const handleOpenModal = () => setShowInventaireModal(true);
  const handleCloseModal = () => setShowInventaireModal(false);

  return (
    <div>
      <Button
        imageSrc="/assets/file.png"
        altText="Inventaire Icon"
        buttonText="Ajouter du materiel"
        onClick={handleOpenModal}
      />
      <FormInventaire show={showInventaireModal} onClose={handleCloseModal} />
      <EntityManager
        entityType="inventory"
        apiEndpoint="http://localhost:3020/inventaire"
        FormComponent={FormInventaire} // Assurez-vous que c'est bien défini ici
      />

    </div>
  );
}

export default InventairePage;
