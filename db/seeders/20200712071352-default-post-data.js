'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Posts', [
      { userId: 2, postTypeId: 1, createdAt: new Date('2020-01-17T03:24:00'), updatedAt: new Date() },
      { userId: 2, postTypeId: 2, createdAt: new Date('2019-12-17T03:24:00'), updatedAt: new Date() },
      { userId: 2, postTypeId: 3, createdAt: new Date('2020-02-17T03:24:00'), updatedAt: new Date() },
      { userId: 3, postTypeId: 1, createdAt: new Date('2020-02-11T03:24:00'), updatedAt: new Date() },
      { userId: 3, postTypeId: 2, createdAt: new Date('2019-11-17T03:24:00'), updatedAt: new Date() },
      { userId: 3, postTypeId: 3, createdAt: new Date('2020-03-17T03:24:00'), updatedAt: new Date() },
      { userId: 4, postTypeId: 1, createdAt: new Date('2019-10-17T03:24:00'), updatedAt: new Date() },
      { userId: 4, postTypeId: 2, createdAt: new Date('2020-05-27T03:24:00'), updatedAt: new Date() },
      { userId: 4, postTypeId: 3, createdAt: new Date('2020-06-04T03:24:00'), updatedAt: new Date() },
      { userId: 4, postTypeId: 3, createdAt: new Date('2020-06-04T03:24:00'), updatedAt: new Date() },
      { userId: 4, postTypeId: 3, createdAt: new Date('2020-03-29T03:24:00'), updatedAt: new Date() },
      { userId: 4, postTypeId: 3, createdAt: new Date('2020-04-13T03:24:00'), updatedAt: new Date() },
      { userId: 4, postTypeId: 3, createdAt: new Date('2020-04-24T03:24:00'), updatedAt: new Date() },
      { userId: 4, postTypeId: 3, createdAt: new Date('2020-04-22T03:24:00'), updatedAt: new Date() },
      { userId: 4, postTypeId: 3, createdAt: new Date('2019-09-11T03:24:00'), updatedAt: new Date() },
      { userId: 4, postTypeId: 3, createdAt: new Date('2020-03-08T03:24:00'), updatedAt: new Date() },
      { userId: 4, postTypeId: 3, createdAt: new Date('2020-06-09T03:24:00'), updatedAt: new Date() },
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
