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
        artistId: 1,
        albumName: "North Coast - Single",
        albumPicture: "https://m.media-amazon.com/images/I/51itdW9i-FL._UX716_FMwebp_QL85_.jpg",
        albumPrice: 3,
        albumRating: 5,
        isExplicit: false
      },
      {
        artistId: 1,
        albumName: "Smith Rock - Single",
        albumPicture: "https://m.media-amazon.com/images/I/518WZ22XuHL._UX716_FMwebp_QL85_.jpg",
        albumPrice: 3,
        albumRating: 5,
        isExplicit: false
      },
      {
        artistId: 2,
        albumName: "Everything Is Easy",
        albumPicture: "https://m.media-amazon.com/images/I/61mqCtipd5L._UX716_FMwebp_QL85_.jpg",
        albumPrice: 7,
        albumRating: 4,
        isExplicit: false
      },
      {
        artistId: 2,
        albumName: "All the Way Round and Back - Single",
        albumPicture: "https://m.media-amazon.com/images/I/417DiWyjv+L._UX716_FMwebp_QL85_.jpg",
        albumPrice: 3,
        albumRating: 5,
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
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1] }
    }, {});

  }
};
