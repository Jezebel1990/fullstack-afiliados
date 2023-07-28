const express = require('express');

const app = express()
const port = 3000;

//Import the routes
const routes = require('./routes');

app.use('/', routes);

app.listen(port, () => {
   console.log(`Servidor rodando em http://localhost:${port}`);
});


