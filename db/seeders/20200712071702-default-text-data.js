'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Texts', [
      {
        postId: 1,
        title: 'Nostalgia, Ultra',
        text: 'Nostalgia, Ultra is the debut mixtape by American singer Frank Ocean. It was released on February 16, 2011. Ocean was inspired to make the mixtape after Hurricane Katrina in his native New Orleans and his subsequent relocation to Los Angeles',
        postTypeId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 3,
        title: 'Channel Orange',
        text: 'Channel Orange is the debut studio album by American R&B singer and songwriter Frank Ocean. It was released on July 10, 2012, by Def Jam Recordings.',
        postTypeId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 5,
        title: 'Blonde',
        text: 'Blonde is the second studio album by American singer Frank Ocean. It was released on August 20, 2016, as a timed exclusive on the iTunes Store and Apple Music, and followed the August 19 release of Ocean\'s video album Endless',
        postTypeId: 1,
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
    return queryInterface.bulkDelete('Texts', null, {});
  }
};
