import React from 'react';
import FormGeneric from './FormGeneric';
import { Modal, Button } from 'react-bootstrap';
import '../styles/Form.css';

function FormInfo({ show, onClose, initialData }) {
  const formFields = [
    { label: "Titre de l'information", name: 'title', type: 'text', required: true },
    { label: 'Contenu', name: 'informationType', type: 'textarea', required: true },
  ];

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? "Modifier une information" : "Ajouter une information"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormGeneric
          formFields={formFields}
          apiEndpoint="http://localhost:3020/information"
          successMessage={initialData ? "Information modifiée avec succès!" : "Information ajoutée avec succès!"}
          errorMessage="Erreur lors de l'ajout ou de la modification de l'information."
          initialData={initialData}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FormInfo;