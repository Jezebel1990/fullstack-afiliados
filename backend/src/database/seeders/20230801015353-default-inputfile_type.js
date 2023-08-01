'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const typeDescriptionsData = [
      { id: 1, description: "Venda produtor", nature: "Entrada", signal: "+" },
      { id: 2, description: "Venda afiliado", nature: "Entrada", signal: "+" },
      { id: 3, description: "Comissão paga", nature: "Saída", signal: "-" },
      { id: 4, description: "Comissão recebida", nature: "Entrada", signal: "+" },
    ];

    await queryInterface.bulkInsert("types", typeDescriptionsData, {});

    // Tabela "types" foi criada e os registros inseridos,
    // Adiciona a coluna de chave estrangeira 'typeId' na tabela 'inputfiles'
    await queryInterface.addColumn("inputfiles", "typeId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "types", 
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT", // Opção de ação ao excluir um tipo com relacionamento
    });

    // Atualiza os registros existentes na tabela 'inputfiles' com o id da descrição correspondente
    await queryInterface.sequelize.query(
      `
      UPDATE inputfiles
      SET "typeId" = (
        CASE
          WHEN "type" = 1 THEN 1
          WHEN "type" = 2 THEN 2
          WHEN "type" = 3 THEN 3
          WHEN "type" = 4 THEN 4
        END
      )
    `
    );

    // Remova a coluna 'type' da tabela 'inputfiles'
    await queryInterface.removeColumn("inputfiles", "type");
  },

  down: async (queryInterface, Sequelize) => {
    // Adicione a coluna 'type' novamente na tabela 'inputfiles'
    await queryInterface.addColumn("inputfiles", "type", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    // Atualize os registros existentes na tabela 'inputfiles' com o valor do tipo correspondente
    await queryInterface.sequelize.query(
      `
      UPDATE inputfiles
      SET "type" = (
        CASE
          WHEN "typeId" = 1 THEN 1
          WHEN "typeId" = 2 THEN 2
          WHEN "typeId" = 3 THEN 3
          WHEN "typeId" = 4 THEN 4
        END
      )
    `
    );

    // Remova a coluna de chave estrangeira 'typeId' da tabela 'inputfiles'
    await queryInterface.removeColumn("inputfiles", "typeId");

    // Remova a tabela de descrição
    await queryInterface.dropTable("types");
  },
};
