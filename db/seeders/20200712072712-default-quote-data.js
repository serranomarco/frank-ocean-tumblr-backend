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
        postId: 3,
        quote: 'I\'ma try to swim from something bigger than me \n Kick off my shoes and swim good, and swim good',
        source: 'Swim Good(Nostalgia, Ultra)',
        postTypeId: 3, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 6,
        quote: 'A tornado flew around my room before you came',
        source: 'Thinking About You(Channel Orange)',
        postTypeId: 3, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 9,
        quote: 'Every night fucks every day up \n Every day patches the night up',
        source: 'Nights(Blonde)',
        postTypeId: 3, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 10,
        quote: 'Been living in an idea, an idea from another man\'s mind.',
        source: 'Seigfried(Blonde)',
        postTypeId: 3, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 11,
        quote: 'Summer\'s not as long as it used to be, everyday counts like crazy',
        source: 'Skyline To(Blonde)',
        postTypeId: 3, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 12,
        quote: 'I know you don\'t need me right now, and to you it\'s just a late night out.',
        source: 'Good Guy(Blonde)',
        postTypeId: 3, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 13,
        quote: 'This love will keep us blinded by the eyes, silence in the ears, darkness of the mind',
        source: 'Godspeed(Blonde)',
        postTypeId: 3, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 14,
        quote: 'I could dream all night, I could drive all night, dreaming',
        source: 'Ivy(Blonde)',
        postTypeId: 3, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 15,
        quote: 'Living so the last night feels like a past life',
        source: 'Nikes(Blonde)',
        postTypeId: 3, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 16,
        quote: 'Wish I was there, wish we\'d grown up on the same advice',
        source: 'Self Control(Blonde)',
        postTypeId: 3, createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 17,
        quote: 'Some nights you dance with tears in your eyes',
        source: 'Self Control(Blonde)',
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
