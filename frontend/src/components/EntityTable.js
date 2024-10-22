import React, { useState } from 'react';

function EntityTable({ entities, documentType, onDelete, onUpdate }) {
  const [selectedEntities, setSelectedEntities] = useState([]);

  const handleSelect = (id) => {
    if (selectedEntities.includes(id)) {
      setSelectedEntities(selectedEntities.filter((entityId) => entityId !== id));
    } else {
      setSelectedEntities([...selectedEntities, id]);
    }
  };

  const handleTogglePresent = (entity) => {
    const updatedEntity = { ...entity, is_present: !entity.is_present };
    onUpdate(updatedEntity); // Appelle onUpdate pour mettre à jour l'entité
  };

  const handleDelete = () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ces ${documentType}s ?`)) {
      onDelete(selectedEntities);
      setSelectedEntities([]);
    }
  };

  const handleEdit = () => {
    console.log('Modifier les éléments sélectionnés : ', selectedEntities);
  };

  return (
    <div>
      {selectedEntities.length > 0 && (
        <div>
          <button onClick={handleEdit}>Modifier</button>
          <button onClick={handleDelete}>Supprimer</button>
        </div>
      )}

      <table className="table">
        <thead>
          <tr>
            <th></th>
            {documentType === 'inventory' ? (
              <>
                <th>Nom</th>
                <th>Type de matériel</th>
                <th>Présent</th>
              </>
            ) : documentType === 'information' ? (
              <>
                <th>Titre</th>
                <th>Contenu</th>
              </>
            ) : (
              <>
                <th>Nom de {documentType}</th>
                <th>Lien</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {entities.map((entity) => (
            <tr key={entity.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedEntities.includes(entity.id)}
                  onChange={() => handleSelect(entity.id)}
                />
              </td>
              {documentType === 'inventory' ? (
                <>
                  <td>{entity.name}</td>
                  <td>{entity.material_type}</td>
                  <td>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={entity.is_present}
                        onChange={() => handleTogglePresent(entity)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </td>
                </>
              ) : documentType === 'information' ? (
                <>
                  <td>{entity.title}</td>
                  <td>{entity.informationtype}</td> {/* Affichage du contenu de l'information */}
                </>
              ) : (
                <>
                  <td>{entity.name_solution}</td>
                  <td>
                    <a href={entity.link_solution} target="_blank" rel="noopener noreferrer">
                      {entity.link_solution}
                    </a>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EntityTable;
