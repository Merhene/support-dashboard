import React from 'react';
import FormGeneric from './FormGeneric';
import '../styles/Form.css';

function FormSolution() {
  const formFields = [
    { label: "Nom de la solution", name: 'name_solution', type: 'text', required: true }, 
    { label: 'Lien vers la solution', name: 'link_solution', type: 'text', required: true }, 
    { label: 'Type de solution', name: 'document_type', type: 'text', required: true }, 
  ];

  return (
    <FormGeneric
      formFields={formFields}
      apiEndpoint="http://localhost:3020/solution"
      successMessage="Materiel ajoutée avec succès!"
      errorMessage="Erreur lors de l'ajout du materiel."
    />
  );
}

export default FormSolution;