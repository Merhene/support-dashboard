import React from 'react';
import FormGeneric from './FormGeneric';
import { Modal, Button } from 'react-bootstrap';
import '../styles/Form.css';

function FormSolution({ show, onClose, initialData }) {
  const formFields = [
    { label: "Nom de la solution", name: 'name_solution', type: 'text', required: true },
    { label: 'Lien vers la solution', name: 'link_solution', type: 'text', required: true },
    { label: 'Type de document', name: 'document_type', type: 'select', required: true },
  ];

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? "Modifier une Solution" : "Ajouter une Solution"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormGeneric
          formFields={formFields}
          apiEndpoint="http://localhost:3020/solution"
          successMessage={initialData ? "Solution modifiée avec succès!" : "Solution ajoutée avec succès!"}
          errorMessage="Erreur lors de l'ajout ou de la modification de la solution."
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

export default FormSolution;
