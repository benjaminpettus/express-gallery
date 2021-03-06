'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Pixes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
        },
      author: {
        allowNull: true,
        type: Sequelize.STRING
        },
      link: {
        allowNull: false,
        type: Sequelize.STRING
        },
      description: {
        type: Sequelize.TEXT
        },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
        },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('Pixes');
  }
};
