const express = require('express');
const mysql = require('mysql2');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'user ', //put yours
  password: process.env.DB_PASSWORD || 'password', // put yours
  database: process.env.DB_NAME || 'db_dashboard',
  port: process.env.DB_PORT || 3306
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à MySQL :', err);
  } else {
    console.log('Connecté à MySQL');
  }
});

const getEntities = (req, res, tableName, documentType) => {
  let query;
  let params;

  if (tableName === 'services' && documentType) {
    query = `SELECT name_solution, link_solution, document_type, id FROM ${tableName} WHERE document_type = ?`;
    params = [documentType];
  } else if (tableName === 'services') {
    query = `SELECT name_solution, link_solution, id FROM ${tableName}`;
    params = [];
  } else if (tableName === 'inventory') {
    query = `SELECT name, material_type, is_present, id FROM ${tableName}`;
    params = [];
  } else if (tableName === 'information') {
    query = `SELECT title, informationtype, id FROM ${tableName}`;
    params = [];
  } else {
    res.status(400).send('Table non reconnue');
    return;
  }

  connection.query(query, params, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des données :', err);
      res.status(500).send(`Erreur lors de la récupération des données de ${tableName}`);
    } else {
      res.json(results);
    }
  });
};

const addEntity = (req, res, tableName, documentType) => {
  const { name_solution, link_solution, document_type, name, material_type, is_present, title, informationType } = req.body;

  let query;
  let values;

  if (tableName === 'services') {
    query = `INSERT INTO ${tableName} (name_solution, link_solution, document_type) VALUES (?, ?, ?)`;
    values = [name_solution, link_solution, document_type];
  } else if (tableName === 'inventory') {
    query = `INSERT INTO ${tableName} (name, material_type, is_present) VALUES (?, ?, ?)`;
    values = [name, material_type, is_present];
  } else if (tableName === 'information') {
    query = `INSERT INTO ${tableName} (title, informationType) VALUES (?, ?)`;
    values = [title, informationType];
  }

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'ajout :', err);
      res.status(500).send(`Erreur lors de l'ajout dans ${tableName}`);
    } else {
      res.status(201).json({ id: result.insertId });
    }
  });
};

const updateEntity = (req, res, tableName) => {
  const { id } = req.params;
  const { name_solution, link_solution, name, material_type, is_present } = req.body;

  let query;
  let values;

  if (tableName === 'services') {
    query = `UPDATE ${tableName} SET name_solution = ?, link_solution = ? WHERE id = ?`;
    values = [name_solution, link_solution, id];
  } else {
    query = `UPDATE ${tableName} SET name = ?, material_type = ?, is_present = ? WHERE id = ?`;
    values = [name, material_type, is_present, id];
  }

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Erreur lors de la mise à jour :', err);
      res.status(500).send(`Erreur lors de la mise à jour de l'entité dans ${tableName}`);
    } else {
      res.json(result);
    }
  });
};

const deleteEntity = (req, res, tableName) => {
  const { id } = req.params;

  const query = `DELETE FROM ${tableName} WHERE id = ?`;

  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression :', err);
      res.status(500).send(`Erreur lors de la suppression dans ${tableName}`);
    } else {
      res.status(204).send();
    }
  });
};

app.get('/solution', (req, res) => getEntities(req, res, 'services', 'solution'));
app.get('/documentation', (req, res) => getEntities(req, res, 'services', 'documentation'));
app.get('/inventaire', (req, res) => getEntities(req, res, 'inventory', null));
app.get('/information', (req, res) => getEntities(req, res, 'information', null));

app.post('/solution', (req, res) => addEntity(req, res, 'services', 'solution'));
app.post('/documentation', (req, res) => addEntity(req, res, 'services', 'documentation'));
app.post('/inventaire', (req, res) => addEntity(req, res, 'inventory', null));
app.post('/information', (req, res) => addEntity(req, res, 'information', null));

app.put('/solution/:id', (req, res) => updateEntity(req, res, 'services'));
app.put('/documentation/:id', (req, res) => updateEntity(req, res, 'services'));
app.put('/inventaire/:id', (req, res) => updateEntity(req, res, 'inventory'));
app.put('/information/:id', (req, res) => updateEntity(req, res, 'information'));

app.delete('/solution/:id', (req, res) => deleteEntity(req, res, 'services'));
app.delete('/documentation/:id', (req, res) => deleteEntity(req, res, 'services'));
app.delete('/inventaire/:id', (req, res) => deleteEntity(req, res, 'inventory'));
app.delete('/information/:id', (req, res) => deleteEntity(req, res, 'information'));

const PORT = process.env.PORT || 3020;
app.listen(PORT, () => {
  console.log(`Serveur MySQL en cours d'exécution sur le port ${PORT}`);
});
