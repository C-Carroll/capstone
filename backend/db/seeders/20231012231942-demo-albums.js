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
        albumName: "Shostakovich Symphony No.5",
        albumPicture: "https://www.clevelandartsevents.com/wp-content/uploads/sites/www.clevelandartsevents.com/images/2019/10/organization-featured-Rebecca-Calkin-1569961327.jpeg",
        albumPrice: 1,
        albumRating: 5,
        isExplicit: false
      },
      {
        artistId: 2,
        albumName: "Symphony No 70 in Gm 'Masud and The Desert'",
        albumPicture: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Desert_Dunes.jpg",
        albumPrice: 1,
        albumRating: 4,
        isExplicit: false
      },
      {
        artistId: 3,
        albumName: "Slow it Down Lay it Back",
        albumPicture: "https://freemusicarchive.org/image/?file=album_image%2FsHM7SX3wKMvGXlQ7owmFMexFqRTWkUhAmDJRjXL8.jpg&width=290&height=290&type=album",
        albumPrice: 12,
        albumRating: 4,
        isExplicit: false
      },
      {
        artistId: 4,
        albumName: "Jehan Titelouze: Magnificats",
        albumPicture: "https://freemusicarchive.org/image/?file=album_image%2FLe3ZkwgouI2frUeC9gglnlmzQ4CATi8Wd9aslaxG.jpg&width=290&height=290&type=album",
        albumPrice: 9,
        albumRating: 4,
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
