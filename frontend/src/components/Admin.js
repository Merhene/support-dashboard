import React from 'react';
import Button from './Button';
import { Routes, Route } from 'react-router-dom';
import FormSolution from './FormSolution';
import FormDocumentation from './FormDocumentation';
import FormInventaire from './FormInventaire';

function Admin() {
  return (
    <div className="admin-page">
      <h2>Admin</h2>
      <div className="admin-buttons">
        <ul>
            <li>
            <Button 
            imageSrc="/assets/solution.png" 
            altText="Solution Icon" 
            buttonText="Ajouter Solution" 
            to="solution-form" 
            />
        </li>
        <li>
            <Button 
            imageSrc="/assets/file.png" 
            altText="Documentation Icon" 
            buttonText="Ajouter Documentation" 
            to="documentation-form" 
            />
        </li>
            <li>
                <Button 
                imageSrc="/assets/file.png" 
                altText="Documentation Icon" 
                buttonText="Ajouter du materiel" 
                to="inventaire-form" 
                />
            </li>
        </ul>
      </div>

      <Routes>
        <Route path="solution-form" element={<FormSolution />} />
        <Route path="documentation-form" element={<FormDocumentation />} />
        <Route path="inventaire-form" element={<FormInventaire />} />
      </Routes>
    </div>
  );
}

export default Admin;