const app = require('./serve');

describe('Testes do Servidor', () => {
  it('Deve iniciar o servidor corretamente', async () => {
    const server = await app.listen(3000);
    expect(server).toBeDefined();
  });

  it('Deve retornar uma mensagem de sucesso ao acessar a rota raiz', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/'
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toContain('Servidor rodando em http://localhost:3000');
  });

  afterAll(() => {
    app.close();
  });
});
