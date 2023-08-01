"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("types", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nature: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      signal: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("types");
  },
};
