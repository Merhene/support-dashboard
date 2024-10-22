import React from 'react';
import FormGeneric from './FormGeneric';
import '../styles/Form.css';

function FormInventaire() {
  const formFields = [
    { label: "Nom du materiel", name: 'name', type: 'text', required: true }, 
    { label: 'Type de materiel', name: 'material_type', type: 'text', required: true }, 
   { label: 'Est présent', name: 'is_present', type: 'checkbox', required: true },
  ];

  return (
    <FormGeneric
      formFields={formFields}
      apiEndpoint="http://localhost:3020/inventaire"
      successMessage="Materiel ajoutée avec succès!"
      errorMessage="Erreur lors de l'ajout du materiel."
    />
  );
}

export default FormInventaire;