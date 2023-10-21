'use strict';
const { Review } = require('../models');

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
    await Review.bulkCreate([
      {
        userId: 1,
        albumId: 1,
        rating: 5,
        ratingDescription: "Goth Babe really worked his magic on this album",
      },
      {
        userId: 3,
        albumId: 2,
        rating: 5,
        ratingDescription: "Love to see how much Griff has evolved since his start. Super inspiring!!",
      },
      {
        userId: 1,
        albumId: 3,
        rating: 4,
        ratingDescription: "This album rocked. I just didnt vibe with all of the songs unfortunately :(",
      },
      {
        userId: 1,
        albumId: 4,
        rating: 5,
        ratingDescription: "What a masterpeice!!! Everyone needs to take a listen.",
      },
      {
        userId: 2,
        albumId: 5,
        rating: 4,
        ratingDescription: "Such a good album! The only reason I cant rate it a 5 is because I like the remixed album a bit better.",
      },
      {
        userId: 2,
        albumId: 6,
        rating: 4,
        ratingDescription: "Another banger from Griz! I appreciate his golden hour albums but prefer his other ones a tad more",
      },
      {
        userId: 3,
        albumId: 7,
        rating: 3,
        ratingDescription: "Good music, just not my style",
      },
      {
        userId: 3,
        albumId: 8,
        rating: 5,
        ratingDescription: "Not the biggest fan of electronic music of anykind, but this ep has changed my mind! Such any easy collection of music to throw on in the background while doing work",
      },
      {
        userId: 4,
        albumId: 9,
        rating: 3,
        ratingDescription: "Not bad, but not for me",
      }

    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      albumId: { [Op.in]: [1, 2, 3, 4] }
    }, {});

  }
};
