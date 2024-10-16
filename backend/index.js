const express = require('express');
const { Pool } = require('pg');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'coiservices',
  password: 'password',
  port: 5432,
});

// Fonction générique pour récupérer des données (GET)
const getEntities = async (req, res, tableName, documentType) => {
  let query;
  let params;

  if (documentType) {
    query = `SELECT * FROM ${tableName} WHERE document_type = $1`;
    params = [documentType];
  } else {
    query = `SELECT * FROM ${tableName}`;
    params = [];
  }

  try {
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Erreur lors de la récupération des données de ${tableName}`);
  }
};

// Fonction générique pour ajouter des données (POST)
const addEntity = async (req, res, tableName, documentType) => {
  try {
    const { name_solution, link_solution, name, material_type, is_present } = req.body;

    let query;
    let values;

    if (documentType) {
      query = `INSERT INTO ${tableName} (name_solution, link_solution, document_type) VALUES ($1, $2, $3) RETURNING *`;
      values = [name_solution, link_solution, documentType];
    } else {
      query = `INSERT INTO ${tableName} (name, material_type, is_present) VALUES ($1, $2, $3) RETURNING *`;
      values = [name, material_type, is_present];
    }

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Erreur lors de l'ajout dans ${tableName}`);
  }
};

// Fonction générique pour mettre à jour des données (PUT)
const updateEntity = async (req, res, tableName) => {
  const { id } = req.params;
  const { name_solution, link_solution, name, material_type, is_present } = req.body;

  let query;
  let values;

  if (tableName === 'services') {
    query = `UPDATE ${tableName} SET name_solution = $1, link_solution = $2 WHERE id = $3 RETURNING *`;
    values = [name_solution, link_solution, id];
  } else {
    query = `UPDATE ${tableName} SET name = $1, material_type = $2, is_present = $3 WHERE id = $4 RETURNING *`;
    values = [name, material_type, is_present, id];
  }

  try {
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).send('Entité non trouvée');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Erreur lors de la mise à jour de l'entité dans ${tableName}`);
  }
};

// Fonction générique pour supprimer des données (DELETE)
const deleteEntity = async (req, res, tableName) => {
  const { id } = req.params;

  try {
    const query = `DELETE FROM ${tableName} WHERE id = $1`;
    const result = await pool.query(query, [id]);

    if (result.rowCount === 0) {
      return res.status(404).send('Entité non trouvée');
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send(`Erreur lors de la suppression dans ${tableName}`);
  }
};

// Routes pour solution, documentation et inventaire
app.get('/solution', (req, res) => getEntities(req, res, 'services', 'solution'));
app.get('/documentation', (req, res) => getEntities(req, res, 'services', 'documentation'));
app.get('/inventaire', (req, res) => getEntities(req, res, 'inventory', null));

app.post('/solution', (req, res) => addEntity(req, res, 'services', 'solution'));
app.post('/documentation', (req, res) => addEntity(req, res, 'services', 'documentation'));
app.post('/inventaire', (req, res) => addEntity(req, res, 'inventory', null));

app.put('/solution/:id', (req, res) => updateEntity(req, res, 'services'));
app.put('/documentation/:id', (req, res) => updateEntity(req, res, 'services'));
app.put('/inventaire/:id', (req, res) => updateEntity(req, res, 'inventory'));

app.delete('/solution/:id', (req, res) => deleteEntity(req, res, 'services'));
app.delete('/documentation/:id', (req, res) => deleteEntity(req, res, 'services'));
app.delete('/inventaire/:id', (req, res) => deleteEntity(req, res, 'inventory'));

const PORT = process.env.PORT || 3020;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
