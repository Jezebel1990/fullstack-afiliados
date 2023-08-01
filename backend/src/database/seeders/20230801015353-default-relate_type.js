'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Verifica se os registros já existem antes de inserir
    const typeDescriptionsData = [
      { id: 1, description: "Venda produtor", nature: "Entrada", signal: "+" },
      { id: 2, description: "Venda afiliado", nature: "Entrada", signal: "+" },
      { id: 3, description: "Comissão paga", nature: "Saída", signal: "-" },
      { id: 4, description: "Comissão recebida", nature: "Entrada", signal: "+" },
    ];

    for (const typeDescription of typeDescriptionsData) {
      const existingType = await queryInterface.sequelize.query(
        `SELECT * FROM types WHERE id = :id`,
        { replacements: { id: typeDescription.id }, type: Sequelize.QueryTypes.SELECT }
      );

      if (!existingType || existingType.length === 0) {
        await queryInterface.bulkInsert("types", [typeDescription]);
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Limpa os registros da tabela 'types'
    await queryInterface.bulkDelete("types", null, {});
  },
};
