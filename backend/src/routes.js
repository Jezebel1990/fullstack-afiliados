import { Router } from 'express';


const routes = Router();// Create the router instance

import AuthController from './app/controllers/AuthController';
import UserController from './app/controllers/UserController';

import authMiddleware from './app/middlewares/authMiddleware';

import InputfileController from './app/controllers/InputfileController';

routes.post('/auth', AuthController.login); //rota login
routes.post('/users', UserController.create); // rota register

// Rotas protegidas pelo middleware de autenticação
routes.use(authMiddleware);
routes.post('/protected-route', (req, res) => {
    try {
      // Obtém o id do usuário autenticado a partir do middleware de autenticação
      const userId = req.userId;
      const data = { message: 'Dados processados com sucesso!', userId };
      return res.json(data);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao processar a rota protegida' });
    }
  });




routes.get('/users', UserController.index); //ver usarios
routes.get('/users/:id', UserController.show);
routes.put('/users', UserController.update);


routes.post('/inputfiles', InputfileController.create);
routes.get('/inputfiles', InputfileController.getAll);
routes.get('/inputfiles/:id', InputfileController.getById);
routes.put('/inputfiles/:id', InputfileController.update);
routes.delete('/inputfiles/:id', InputfileController.delete);

export default routes;
