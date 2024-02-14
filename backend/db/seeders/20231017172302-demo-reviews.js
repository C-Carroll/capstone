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
