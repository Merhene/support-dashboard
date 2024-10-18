import React, { useState } from 'react';

function EntityTable({ entities, documentType, onDelete }) {
  const [selectedEntities, setSelectedEntities] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);

  const handleSelect = (id) => {
    if (selectedEntities.includes(id)) {
      setSelectedEntities(selectedEntities.filter((entityId) => entityId !== id));
    } else {
      setSelectedEntities([...selectedEntities, id]);
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ces ${documentType}s ?`)) {
      onDelete(selectedEntities);
      setSelectedEntities([]);
      setShowCheckboxes(false);
    }
  };

  const toggleCheckboxes = () => {
    setShowCheckboxes(!showCheckboxes);
  };

  return (
    <div>
      <button onClick={toggleCheckboxes}>
        {showCheckboxes ? `Annuler la sélection des ${documentType}s` : `Supprimer des ${documentType}s`}
      </button>
      {showCheckboxes && <button onClick={handleDelete}>Confirmer la suppression</button>}
      <table className="table">
        <thead>
          <tr>
            {showCheckboxes && <th></th>}
            {documentType === 'inventory' ? (
              <>
                <th>Nom</th>
                <th>Type de matériel</th>
                <th>Présent</th>
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

              {showCheckboxes && (
                <td>
                  <input
                    type="checkbox"
                    checked={selectedEntities.includes(entity.id)}
                    onChange={() => handleSelect(entity.id)}
                  />
                </td>
              )}
              {documentType === 'inventory' ? (
                <>
                  <td>{entity.name}</td>
                  <td>{entity.material_type}</td>
                  <td>{entity.is_present ? 'Oui' : 'Non'}</td>
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
