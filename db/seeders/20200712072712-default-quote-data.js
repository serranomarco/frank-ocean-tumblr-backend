'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Quotes', [
      {
        postId: 2,
        quote: 'I\'ma try to swim from something bigger than me \n Kick off my shoes and swim good, and swim good',
        source: 'Swim Good(Nostalgia, Ultra)',
        postTypeId: 3, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 4,
        quote: 'A tornado flew around my room before you came',
        source: 'Thinking About You(Channel Orange)',
        postTypeId: 3, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 6,
        quote: 'Every night fucks every day up \n Every day patches the night up',
        source: 'Nights(Blonde)',
        postTypeId: 3, createdAt: new Date(),
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
    return queryInterface.bulkDelete('Quotes', null, {});
  }
};
