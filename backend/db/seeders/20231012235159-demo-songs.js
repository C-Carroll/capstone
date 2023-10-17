'use strict';
const { Song } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await Song.bulkCreate([
      //Goth Babe
      {
        artistId: 1,
        albumId: 1,
        songName: "The Trees",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=9_epwiwVdIk",
        isExplicit: false
      },
      {
        artistId: 1,
        albumId: 1,
        songName: "As She Dreams",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=D-OaLxVdUgw",
        isExplicit: false
      },
      {
        artistId: 1,
        albumId: 1,
        songName: "Moments / Tides",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=T2QJoV297Bk",
        isExplicit: false
      },
      {
        artistId: 1,
        albumId: 2,
        songName: "Colours",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=zawWaStgurY",
        isExplicit: false
      },
      {
        artistId: 1,
        albumId: 2,
        songName: "Little Colorful Mind",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=Lb6iiiEG9Nk",
        isExplicit: false
      },
      {
        artistId: 1,
        albumId: 2,
        songName: "Her Vacation",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=BCs6DDvodbI",
        isExplicit: false
      },


      //Rum Jungle
      {
        artistId: 2,
        albumId: 3,
        songName: "Upbeat Lord",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=3xHwO7UoTzg",
        isExplicit: false
      },
      {
        artistId: 2,
        albumId: 3,
        songName: "Wasting Your Time",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=euQaqxWMMn0",
        isExplicit: false
      },
      {
        artistId: 2,
        albumId: 3,
        songName: "Crimson Sunset",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=_PD7U2U3ZTY",
        isExplicit: false
      },
      {
        artistId: 2,
        albumId: 3,
        songName: "No Hotels",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=I-jIBmzr7J4",
        isExplicit: false
      },
      {
        artistId: 2,
        albumId: 3,
        songName: "Everything Is Easy",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=RnST8NB0Tl0",
        isExplicit: false
      },
      {
        artistId: 2,
        albumId: 3,
        songName: "Lazy Afternoon",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=bPCObriE7yg",
        isExplicit: false
      },
      {
        artistId: 2,
        albumId: 3,
        songName: "Figure It Out Someday",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=nnHIHK6-OKo",
        isExplicit: false
      },
      {
        artistId: 2,
        albumId: 4,
        songName: "All the Way Round and Back",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=raicUcWFH-8",
        isExplicit: false
      },
      {
        artistId: 2,
        albumId: 4,
        songName: "The Exchange",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=sH5OFqGIMP8",
        isExplicit: false
      },


    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Songs';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      artistId: { [Op.in]: [1, 2] }
    }, {});

  }
};
