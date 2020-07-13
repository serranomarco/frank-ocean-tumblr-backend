'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Photos', [
      { postId: 2, caption: 'Here\'s the tracklist for the very first album from Frank Ocean!!', photoUrl: 'https://spoiledbroke.files.wordpress.com/2011/03/beat-credits.png', postTypeId: 2, createdAt: new Date(), updatedAt: new Date() },
      { postId: 5, caption: 'Ocean started writing songs for Channel Orange in February 2011 with songwriter and producer Malay, his friend and creative partner since their start in the music industry as songwriters. They originally met in Atlanta and worked for the same publishing company, through which they reconnected after Malay moved to Los Angeles. Ocean spent more time with Malay, introducing him to his Odd Future collective, while connecting creatively through their respective songwriting, which led to their partnership for Channel Orange. For the album, Ocean wrote his lyrics to complement Malay\'s ideas for the music. Occasionally, they wrote songs together by improvising musical ideas from Malay\'s keyboard and guitar playing. Channel Orange was written in two weeks, according to the singer', photoUrl: 'https://assets.fontsinuse.com/static/use-media-items/109/108369/full-1200x1200/5e7defec/channel-orange-tracklist.jpeg?resolution=0', postTypeId: 2, createdAt: new Date(), updatedAt: new Date() },
      { postId: 8, caption: 'This is personally one of my favorite Frank Ocean albums and I really love listening to it!', photoUrl: 'https://contestimg.wish.com/api/webimage/5ba875076af4bf2959fc75d5-large.jpg?cache_buster=4746a94eb015a6be92e8bb8ba39bcf8a', postTypeId: 2, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Photos', null, {});
  }
};
