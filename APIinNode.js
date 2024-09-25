Configuring database connection
// server.js
const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Create a MySQL connection using the environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});


Retrieving all patients
// Question 1: Retrieve all patients
app.get('/patients', (req, res) => {
  const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching patients:', err);
      res.status(500).send('Error fetching patients');
    } else {
      res.json(results);
    }
  });
});


Retrieving all providers
// Question 2: Retrieve all providers
app.get('/providers', (req, res) => {
  const query = 'SELECT first_name, last_name, provider_specialty FROM providers';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching providers:', err);
      res.status(500).send('Error fetching providers');
    } else {
      res.json(results);
    }
  });
});


Filtering patients by first name
// Question 3: Filter patients by first name
app.get('/patients/filter', (req, res) => {
  const { first_name } = req.query;
  const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
  
  db.query(query, [first_name], (err, results) => {
    if (err) {
      console.error('Error fetching patients by first name:', err);
      res.status(500).send('Error fetching patients by first name');
    } else {
      res.json(results);
    }
  });
});


Retrieving providers by speciality
// Question 4: Retrieve providers by specialty
app.get('/providers/specialty', (req, res) => {
  const { provider_specialty } = req.query;
  const query = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';
  
  db.query(query, [provider_specialty], (err, results) => {
    if (err) {
      console.error('Error fetching providers by specialty:', err);
      res.status(500).send('Error fetching providers by specialty');
    } else {


      res.json(results);
    }
  });
});

