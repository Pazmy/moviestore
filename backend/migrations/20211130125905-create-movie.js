"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Movies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      director: {
        type: Sequelize.STRING,
      },
      studio: {
        type: Sequelize.STRING,
      },
      duration: {
        type: Sequelize.STRING,
      },
      release: {
        type: Sequelize.STRING,
      },

      rate: {
        type: Sequelize.STRING,
      },
      trailer: {
        type: Sequelize.STRING,
      },
      views: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      image: {
        type: Sequelize.STRING,
      },
      poster: {
        type: Sequelize.STRING,
      },
      overview: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.STRING,
      },
      episode: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Movies");
  },
};
