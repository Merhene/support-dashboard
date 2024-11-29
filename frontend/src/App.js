import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Button from './components/Button.js';
import './App.css';
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


export default App;
