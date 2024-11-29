import React from 'react';
import FormGeneric from './FormGeneric';
import { Modal, Button } from 'react-bootstrap';
import '../styles/Form.css';

function FormDocumentation({ show, onClose, initialData }) { 
  const formFields = [
    { label: "Nom de la documentation", name: 'name_solution', type: 'text', required: true },  
    { label: 'Lien vers la documentation', name: 'link_solution', type: 'text', required: true },
    { label: 'Type de document', name: 'document_type', type: 'select', required: true },
  ];

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? "Modifier une documentation" : "Ajouter une documentation"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormGeneric
          formFields={formFields}
          apiEndpoint="http://localhost:3020/documentation"
          successMessage={initialData ? "Documentation modifiée avec succès!" : "Documentation ajoutée avec succès!"}
          errorMessage="Erreur lors de l'ajout ou de la modification de la documentation."
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

export default FormDocumentation;