'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Posts', [
      { userId: 2, postTypeId: 1, createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, postTypeId: 3, createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, postTypeId: 1, createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, postTypeId: 3, createdAt: new Date(), updatedAt: new Date() },
      { userId: 4, postTypeId: 1, createdAt: new Date(), updatedAt: new Date() },
      { userId: 4, postTypeId: 3, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
