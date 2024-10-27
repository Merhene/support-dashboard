import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import EntityTable from './EntityTable';

function EntityManager({ entityType, apiEndpoint, FormComponent }) {
  const [entities, setEntities] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
        setShowModal(false);
      } else {
        console.error('Erreur lors de la mise à jour');
      }
    } catch (err) {
      console.error(`Erreur lors de la mise à jour des ${entityType}s :`, err);
    }
  };

  const handleEditEntity = (entity) => {
    setSelectedEntity(entity);
    setShowModal(true);
  };

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
            setFormData={handleEditEntity}
          />
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Modifier l'entité</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedEntity && (
                <FormComponent
                  initialData={selectedEntity}
                  onClose={() => setShowModal(false)}
                />
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Fermer
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
}

export default EntityManager;