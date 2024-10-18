import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Button from './components/Button.js';
import './App.css';
import EntityManager from './components/EntityManager.js';
import EntityTable from './components/EntityTable.js';
import FormInventaire from './components/FormInventaire.js';
import DocumentationPage from './pages/DocumentationPage.js';
import InventairePage from './pages/InventairePage.js';
import SolutionPage from './pages/SolutionPage.js';
import InfoPage from './pages/InfoPage.js';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Button 
                imageSrc="./assets/solution.png" 
                altText="Solution Icon" 
                buttonText="Solution" 
                to="/solution" 
              />
            </li>
            <li>
              <Button 
                imageSrc="/assets/file.png" 
                altText="Documentation Icon" 
                buttonText="Documentation" 
                to="/documentation" 
              />
            </li>
            <li>
              <Button 
                imageSrc="/assets/inventory.png" 
                altText="Inventaire Icon" 
                buttonText="Inventaire" 
                to="/inventaire" 
              />
            </li>
            <li>
              <Button 
                imageSrc="/assets/inventory.png" 
                altText="Inventaire Icon" 
                buttonText="Information" 
                to="/information" 
              />
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/solution" element={<SolutionPage />} />
          <Route path="/documentation" element={<DocumentationPage />} />
          <Route path="/inventaire" element={<InventairePage />} />
          <Route path="/information" element={<InfoPage />} />
        </Routes>
      </div>
    </Router>
  );
}


function Inventaire() {
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch('http://localhost:3020/inventaire');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération de l\'inventaire');
        }
        const data = await response.json();
        setInventory(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchInventory();
  }, []);

  const handleMaterialAdded = (newMaterial) => {
    setInventory([...inventory, newMaterial]);
  };

  const handleDeleteMaterials = async (selectedMaterials) => {
    try {
      await Promise.all(selectedMaterials.map(async (materialId) => {
        await fetch(`http://localhost:3020/inventaire/${materialId}`, {
          method: 'DELETE',
        });
      }));
      setInventory(inventory.filter(material => !selectedMaterials.includes(material.id)));
    } catch (err) {
      console.error('Erreur lors de la suppression des matériels :', err);
    }
  };

  return (
    <div>
      <h2>Inventaire</h2>
      {error ? <p>{error}</p> : (
        <>
          <FormInventaire onMaterialAdded={handleMaterialAdded} />
          <EntityTable
            entities={inventory}
            documentType="material"
            onDelete={handleDeleteMaterials}
          />
        </>
      )}
    </div>
  );
}


export default App;
