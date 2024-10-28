import React from 'react';
import FormGeneric from './FormGeneric';
import { Modal, Button } from 'react-bootstrap';
import '../styles/Form.css';

function FormInventaire({ show, onClose, initialData }) {
  const formFields = [
    { label: "Nom du materiel", name: 'name', type: 'text', required: true }, 
    { label: 'Type de materiel', name: 'material_type', type: 'text', required: true }, 
   { label: 'Est présent', name: 'is_present', type: 'checkbox', required: true },
  ];

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? "Modifier un materiel" : "Ajouter un materiel"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormGeneric
          formFields={formFields}
          apiEndpoint="http://localhost:3020/inventaire"
          successMessage={initialData ? "Materiel modifiée avec succès!" : "Materiel ajoutée avec succès!"}
          errorMessage="Erreur lors de l'ajout ou de la modification du materiel."
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
export default FormInventaire;