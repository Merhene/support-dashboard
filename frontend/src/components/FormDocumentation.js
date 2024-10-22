import React from 'react';
import FormGeneric from './FormGeneric';
import '../styles/Form.css';

function FormDocumentation() { 
  const formFields = [
    { label: "Nom de la documentation", name: 'name_solution', type: 'text', required: true },  
    { label: 'Lien vers la documentation', name: 'link_solution', type: 'text', required: true },
    { label: 'Type de solution', name: 'document_type', type: 'text', required: true },
  ];

  return (
    <FormGeneric
      formFields={formFields}
      apiEndpoint="http://localhost:3020/documentation" 
      successMessage="Documentation ajoutée avec succès!" 
      errorMessage="Erreur lors de l'ajout de la documentation." 
    />
  );
}

export default FormDocumentation;