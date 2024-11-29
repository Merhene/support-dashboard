import React, { useState } from 'react';
import EntityManager from '../components/EntityManager.js';
import FormDocumentation from '../components/FormDocumentation.js';
import Button from '../components/Button.js';

function DocumentationPage() {
  const [showDocumentationModal, setShowDocumentationModal] = useState(false);

  const handleOpenModal = () => setShowDocumentationModal(true);
  const handleCloseModal = () => setShowDocumentationModal(false);

  return (
    <div>
      <Button
        imageSrc="/assets/file.png"
        altText="Documentation Icon"
        buttonText="Ajouter Documentation"
        onClick={handleOpenModal}
      />
      <FormDocumentation show={showDocumentationModal} onClose={handleCloseModal} />
      <EntityManager
        entityType="documentation"
        apiEndpoint="http://localhost:3020/documentation"
        FormComponent={FormDocumentation} // Assurez-vous que c'est bien défini ici
      />

</div>
  );
}

export default DocumentationPage;
