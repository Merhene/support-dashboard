import React, { useState, useEffect } from 'react';
import EntityTable from './EntityTable';
import FormSolution from './FormSolution.js';
import FormInventaire from './FormInventaire.js';
import FormInfo from './FormInfo.js';
import FormDocumentation from './FormDocumentation.js';

function EntityManager({ entityType, apiEndpoint }) {
  const [entities, setEntities] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
          throw new Error(`Erreur lors de la récupération des ${entityType}s`);
        }
        const data = await response.json();
        setEntities(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchEntities();
  }, [apiEndpoint, entityType]);

  const handleUpdateEntity = async (updatedEntity) => {
    try {
      const response = await fetch(`${apiEndpoint}/${updatedEntity.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEntity),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setEntities((prevEntities) =>
          prevEntities.map((entity) =>
            entity.id === updatedData.id ? updatedData : entity
          )
        );
        setSelectedEntity(null);
        setShowForm(false);
      } else {
        console.error('Erreur lors de la mise à jour');
      }
    } catch (err) {
      console.error(`Erreur lors de la mise à jour des ${entityType}s :`, err);
    }
  };

  const handleDeleteEntities = async (selectedEntities) => {
    try {
      await Promise.all(
        selectedEntities.map(async (entityId) => {
          await fetch(`${apiEndpoint}/${entityId}`, {
            method: 'DELETE',
          });
        })
      );
      setEntities((prevEntities) =>
        prevEntities.filter((entity) => !selectedEntities.includes(entity.id))
      );
    } catch (err) {
      console.error(`Erreur lors de la suppression des ${entityType}s :`, err);
    }
  };

  const handleEditEntity = (entity) => {
    setSelectedEntity(entity);
    setShowForm(true);
  };

  const getFormComponent = () => {
    switch (entityType) {
      case 'solution':
        return FormSolution;
      case 'inventory':
        return FormInventaire;
      case 'information':
        return FormInfo;
      case 'documentation':
        return FormDocumentation;
      default:
        return null;
    }
  };

  const FormComponent = getFormComponent();

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <EntityTable
            entities={entities}
            documentType={entityType}
            onUpdate={handleUpdateEntity}
            onDelete={handleDeleteEntities}
            setFormData={handleEditEntity}
          />
          {showForm && selectedEntity && FormComponent && (
            <FormComponent
              show={showForm}
              onClose={() => {
                setSelectedEntity(null);
                setShowForm(false);
              }}
              initialData={selectedEntity}
            />
          )}
        </>
      )}
    </div>
  );
}

export default EntityManager;
