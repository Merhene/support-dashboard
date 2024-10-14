import './App.css';
import React from 'react';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/solution">Solution</Link>
            </li>
            <li>
              <Link to="/documentation">Documentation</Link>
            </li>
            <li>
              <Link to="/inventaire">Inventaire</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/solution" element={<Solution />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/inventaire" element={<Inventaire />} />
        </Routes>
      </div>
    </Router>
  );
}

function Solution() {
  return <div>Welcome to the Solution page!</div>;
}

function Documentation() {
  return <div>Welcome to the Documentation page!</div>;
}

function Inventaire() {
  return <div>Welcome to the Inventaire page!</div>;
}

export default App;
