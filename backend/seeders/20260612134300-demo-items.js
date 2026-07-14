"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Items", [
      {
        name: "Item b1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Item b2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Item b3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Item b4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Items", null, {});
  },
};
