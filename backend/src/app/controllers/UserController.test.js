import request from 'supertest';
import User from '../models/User';
import { sequelize } from '../database'; 

describe('UserController', () => {
    // Teste para o método 'create'
    describe('POST /users', () => {
      it('should create a new user and return user data', async () => {
        // Dados de usuário para o cenário de teste
        const userData = {
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: 'password',
        };
  
        // Realize uma solicitação POST para a rota de criação de usuários com os dados do usuário
        const response = await request(app)
          .post('/users')
          .send(userData);
  
        // Verifique se a resposta possui um status 200
        expect(response.status).toBe(200);
  
        // Verifique se a resposta possui o formato esperado (um objeto com as propriedades id, name, email, status, is_admin)
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name', userData.name);
        expect(response.body).toHaveProperty('email', userData.email);
        expect(response.body).toHaveProperty('status', true);
        expect(response.body).toHaveProperty('is_admin', false);
  
        // Verifique se o usuário foi realmente criado no banco de dados (opcional, depende da sua implementação)
        const createdUser = await User.findOne({ where: { email: userData.email } });
        expect(createdUser).toBeTruthy();
      });
  
    });
  });
  
