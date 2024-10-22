import React, { useEffect, useState } from 'react';
import EntityTable from './EntityTable';

function EntityManager({ entityType, apiEndpoint, formFields }) {
  const [entities, setEntities] = useState([]);
  const [error, setError] = useState(null);

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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEntity),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setEntities((prevEntities) =>
          prevEntities.map((entity) =>
            entity.id === updatedData.id ? updatedData : entity
          )
        );
      } else {
        console.error('Erreur lors de la mise à jour');
      }
    } catch (err) {
      console.error(`Erreur lors de la mise à jour des ${entityType}s :`, err);
    }
  };

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <EntityTable
          entities={entities}
          documentType={entityType}
          onUpdate={handleUpdateEntity} // Passez onUpdate ici
          onDelete={(selectedEntities) => {
            // Implémentation de suppression ici
          }}
        />
      )}
    </div>
  );
}

export default EntityManager;