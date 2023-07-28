const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');

const app = express()
const port = 3000;

//Import the routes
const routes = require('./routes');

dotenv.config();

const DB_USER = process.env.DB_USER;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_PORT = process.env.DB_PORT;


const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: DB_PORT,
});

// Add the pool to the app locals, so it's accessible in the routes
app.locals.pool = pool;

app.use('/', routes);

app.listen(port, () => {
   console.log(`Servidor rodando em http://localhost:${port}`);
});


