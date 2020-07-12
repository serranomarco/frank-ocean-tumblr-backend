'use strict';
const faker = require('faker');
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
        userName: 'nostalgiaultra',
        email: 'nostalgia@gmail.com',
        hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
        profilePicPath: 'https://media.pitchfork.com/photos/5929adeb9d034d5c69bf444e/1:1/w_320/084ee64d.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userName: 'channelorange',
        email: 'channelorange@gmail.com',
        hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
        profilePicPath: 'https://upload.wikimedia.org/wikipedia/en/2/28/Channel_ORANGE.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userName: 'blonde',
        email: 'blonde@gmail.com',
        hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
        profilePicPath: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a0/Blonde_-_Frank_Ocean.jpeg/220px-Blonde_-_Frank_Ocean.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
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
