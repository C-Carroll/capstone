'use strict';
const { Album } = require('../models');

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
    await Album.bulkCreate([
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
      {
        artistId: 3,
        albumName: "Flower of Devotion",
        albumPicture: "https://m.media-amazon.com/images/I/511H5zzwJmL._UX716_FMwebp_QL85_.jpg",
        albumPrice: 12,
        albumRating: 4,
        isExplicit: false
      },
      {
        artistId: 4,
        albumName: "Chasing the Golden Hour, Pt.4",
        albumPicture: "https://m.media-amazon.com/images/I/81uSYGVn6eL._AA256_UX716_FMwebp_QL85_.jpg",
        albumPrice: 9,
        albumRating: 4,
        isExplicit: false
      },
      {
        artistId: 5,
        albumName: "Goose Bumps",
        albumPicture: "https://m.media-amazon.com/images/I/61GyIbjI6jL._UX716_FMwebp_QL85_.jpg",
        albumPrice: 10,
        albumRating: 3,
        isExplicit: false
      },
      {
        artistId: 6,
        albumName: "The Tale of Elegos",
        albumPicture: "https://m.media-amazon.com/images/I/61l8MuRi0AL._UX716_FMwebp_QL85_.jpg",
        albumPrice: 5,
        albumRating: 5,
        isExplicit: false
      },
      {
        artistId: 7,
        albumName: "Apple Crumble",
        albumPicture: "https://m.media-amazon.com/images/I/61gJOZLXv5L._UX716_FMwebp_QL85_.jpg",
        albumPrice: 12,
        albumRating: 3,
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
    options.tableName = 'Albums';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      artistId: { [Op.in]: [1, 2] }
    }, {});

  }
};
