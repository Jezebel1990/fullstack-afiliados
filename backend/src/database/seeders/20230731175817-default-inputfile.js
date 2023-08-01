'use strict';

module.exports = {
up: async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('inputfiles', [
    {
      type: 1,
      date: new Date(),
      product: 'Descrição do produto',
      amount: 0.10,
      seller: 'João Silva',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      type: 2,
      date: new Date(),
      product: 'Descrição do produto',
      amount: 0.50,
      seller: 'Mario Souza',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
 
  ], {});
},

down: async (queryInterface) => {
  await queryInterface.bulkDelete('inputfiles', null, {});
}
};
