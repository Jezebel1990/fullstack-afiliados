import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import routes from './routes';
import swaggerUI from 'swagger-ui-express';
const swaggerDocument = require('./swagger.json');
import './database';

const app = express();

app.use(cors({
   origin: ["http://localhost:3000"],
   methods: ["POST", "GET", "PUT", "DELETE"],
   credentials: true
 }))
 app.use(express.json());
 app.use(express.static('public'));
 app.use(
   '/api-docs', 
   swaggerUI.serve,
   swaggerUI.setup(swaggerDocument)

 );
const port = 3000;
app.use(routes);

app.listen(port, () => {
   console.log(`Servidor rodando em http://localhost:${port}`);
});
