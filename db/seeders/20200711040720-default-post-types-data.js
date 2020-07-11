'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('PostTypes', [
      { postType: 'text', createdAt: new Date(), updatedAt: new Date() },
      { postType: 'photo', createdAt: new Date(), updatedAt: new Date() },
      { postType: 'quote', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('PostsTypes', null, {});
  }
};
