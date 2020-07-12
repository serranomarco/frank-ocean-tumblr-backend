'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Follows', [
      { followerId: 1, followingId: 2, createdAt: new Date(), updatedAt: new Date() },
      { followerId: 1, followingId: 3, createdAt: new Date(), updatedAt: new Date() },
      { followerId: 1, followingId: 4, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Follows', null, {});
  }
};
