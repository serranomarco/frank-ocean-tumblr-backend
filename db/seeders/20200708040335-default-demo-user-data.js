'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Users', [
      {
        userName: 'demouser',
        email: 'demo@example.com',
        hashedPassword: bcrypt.hashSync('password', 10),
        profilePicPath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSVOp3hYOhOho5p9WvL1r4RuT4S-PUS5zFKtg&usqp=CAU',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
