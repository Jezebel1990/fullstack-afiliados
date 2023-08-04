import request from 'supertest';
import { sequelize } from '../database'; 
import Inputfile from '../models/Inputfile';

describe('InputfileController', () => {
    // Teste para o método 'create'
    describe('POST /inputfiles', () => {
      it('should create a new inputfile and return a success response', async () => {
        // Dados do arquivo de entrada para o cenário de teste
        const inputData = {
          type: 'Type 1',
          date: '2023-08-05',
          product: 'Product 1',
          amount: 10,
          seller: 'Seller 1',
        };
  
        // Realize uma solicitação POST para a rota de criação de arquivos de entrada com os dados do arquivo
        const response = await request(app)
          .post('/inputfiles')
          .send(inputData);
  
        // Verifique se a resposta possui um status 204 (sem conteúdo)
        expect(response.status).toBe(204);
  
        // Verifique se o arquivo de entrada foi realmente criado no banco de dados (opcional, depende da sua implementação)
        const createdInputfile = await Inputfile.findOne({ where: { product: inputData.product } });
        expect(createdInputfile).toBeTruthy();
      });
  
    });
  });
  
