"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPasswordOne = await bcrypt.hash("Qwerty123!", 10);
    const hashedPasswordTwo = await bcrypt.hash("Qwerty1234!", 10);
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "Tom Hardy",
          email: "tom@exam.com",
          password: hashedPasswordOne,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "Spanch Bob",
          email: "spanch@exam.com",
          password: hashedPasswordTwo,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
