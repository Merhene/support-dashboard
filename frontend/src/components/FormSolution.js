import React from 'react';
import FormGeneric from './FormGeneric';
import { Modal, Button } from 'react-bootstrap';
import '../styles/Form.css';

function FormSolution({ show, onClose }) {
  const formFields = [
    { label: "Nom de la solution", name: 'name_solution', type: 'text', required: true },
    { label: 'Lien vers la solution', name: 'link_solution', type: 'text', required: true },
  ];

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ajouter une Solution</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormGeneric
          formFields={formFields}
          apiEndpoint="http://localhost:3020/solution"
          successMessage="Solution ajoutée avec succès!"
          errorMessage="Erreur lors de l'ajout de la solution."
          initialData={{ document_type: 'solution' }}
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
