import React, { useState, useEffect } from 'react';
import EntityTable from './EntityTable';
import FormGeneric from './FormGeneric';
import { Modal, Button } from 'react-bootstrap';


function EntityManager({ entityType, apiEndpoint }) {
  const [entities, setEntities] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  let formFields = [];

  if (entityType === "solution") {
    formFields = [
      { label: "Nom de la solution", name: 'name_solution', type: 'text', required: true },
      { label: 'Lien vers la solution', name: 'link_solution', type: 'text', required: true },
      { label: 'Type de solution', name: 'document_type', type: 'text', required: true },
    ];
  } else if (entityType === "inventory") {
    formFields = [
      { label: "Nom", name: 'name', type: 'text', required: true },
      { label: "Type de matériel", name: 'material_type', type: 'text', required: true },
      { label: "Présent", name: 'is_present', type: 'checkbox' },
    ];
  } else if (entityType === "information") {
    formFields = [
      { label: "Titre", name: 'title', type: 'text', required: true },
      { label: "Contenu", name: 'informationtype', type: 'text', required: true },
    ];
  }

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
            onDelete={handleDeleteEntities}
            setFormData={handleEditEntity}
          />
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Modifier l'entité</Modal.Title>
            </Modal.Header>
            <Modal.Body>
          {selectedEntity && (
            <FormGeneric
              formFields={formFields}
              apiEndpoint={`${apiEndpoint}/${selectedEntity.id}`}
              successMessage="Entité modifiée avec succès !"
              errorMessage="Erreur lors de la modification de l'entité."
              initialData={selectedEntity}
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
