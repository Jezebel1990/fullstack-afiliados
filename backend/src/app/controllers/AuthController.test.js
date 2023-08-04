import request from 'supertest';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';



describe('AuthController', () => {
    it('should authenticate a user and return a valid token', async () => {
      // Crie um usuário para o cenário de teste
      const user = await User.create({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password',
      });
  
      // Realize uma solicitação POST para a rota de login com as credenciais do usuário criado
      const response = await request(app)
        .post('/login')
        .send({ email: 'testuser@example.com', password: 'password' });
  
      // Verifique se a resposta possui um status 200
      expect(response.status).toBe(200);
  
      // Verifique se a resposta possui o formato esperado (um objeto com as propriedades user e token)
      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('token');
  
      // Verifique se o token retornado é válido
      const decodedToken = jwt.verify(response.body.token, authConfig.secret);
      expect(decodedToken.id).toBe(user.id);
    });
  });
  