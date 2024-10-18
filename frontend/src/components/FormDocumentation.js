import React from 'react';
import FormGeneric from './FormGeneric';
import '../styles/Form.css';

function FormDocumentation() { 
  const formFields = [
    { label: "Nom de la documentation", name: 'nameDocumentation', type: 'text', required: true },  
    { label: 'Lien vers la documentation', name: 'linkDocumentation', type: 'text', required: true },   
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