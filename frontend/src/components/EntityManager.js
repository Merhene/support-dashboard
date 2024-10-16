import React, { useEffect, useState } from 'react';
import EntityTable from './EntityTable';

function EntityManager({ entityType, apiEndpoint }) {
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

  const handleDeleteEntities = async (selectedEntities) => {
    try {
      await Promise.all(selectedEntities.map(async (entityId) => {
        await fetch(`${apiEndpoint}/${entityId}`, {
          method: 'DELETE',
        });
      }));
      setEntities(entities.filter(entity => !selectedEntities.includes(entity.id)));
    } catch (err) {
      console.error(`Erreur lors de la suppression des ${entityType}s :`, err);
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
          onDelete={handleDeleteEntities}
        />
      )}
    </div>
  );
}

export default EntityManager;