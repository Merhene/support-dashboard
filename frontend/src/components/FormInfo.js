import React from 'react';
import FormGeneric from './FormGeneric';
import { Modal, Button } from 'react-bootstrap';
import '../styles/Form.css';

function FormInfo() {
  const formFields = [
    { label: "Titre de l'information", name: 'title', type: 'text', required: true },
    { label: 'Contenu', name: 'informationType', type: 'textarea', required: true },
  ];

  return (
    <FormGeneric
      formFields={formFields}
      apiEndpoint="http://localhost:3020/information"
      successMessage="Information ajoutée avec succès!"
      errorMessage="Erreur lors de l'ajout de l'information."
    />
  );
}

export default FormInfo;