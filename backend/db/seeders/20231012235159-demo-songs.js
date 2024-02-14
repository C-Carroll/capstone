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
        songName: "I.Moderato",
        price: 1,
        songUrl: "",
        isExplicit: false,
        uid:"mod1"
      },
      {
        artistId: 1,
        albumId: 1,
        songName: "II.Allegretto",
        price: 1,
        songUrl: "",
        isExplicit: false,
        uid:"mod2"
      },
      {
        artistId: 1,
        albumId: 1,
        songName: "III.Largo",
        price: 1,
        songUrl: "",
        isExplicit: false,
        uid:"mod3"
      },
      {
        artistId: 1,
        albumId: 1,
        songName: "IV.Allegro non troppo",
        price: 1,
        songUrl: "",
        isExplicit: false,
        uid:"mod4"
      },

      {
        artistId: 2,
        albumId: 2,
        songName: "01 Symph 70",
        price: 1,
        songUrl: "",
        isExplicit: false,
        uid:"ach1"
      },
      {
        artistId: 2,
        albumId: 2,
        songName: "02 Symph 70",
        price: 1,
        songUrl: "",
        isExplicit: false,
        uid:"ach2"
      },
      {
        artistId: 2,
        albumId: 2,
        songName: "03 Symph 70",
        price: 1,
        songUrl: "",
        isExplicit: false,
        uid:"ach3"
      },


      {
        artistId: 3,
        albumId: 3,
        songName: "Summer Rain",
        price: 1,
        songUrl: "",
        isExplicit: false,
        uid:"mae1"
      },
      {
        artistId: 3,
        albumId: 3,
        songName: "Let It Go",
        price: 1,
        songUrl: "",
        isExplicit: false,
        uid:"mae2"
      },
      {
        artistId: 3,
        albumId: 3,
        songName: "Sell All Your Sorrows",
        price: 1,
        songUrl: "",
        isExplicit: false,
        uid:"mae3"
      },
      {
        artistId: 3,
        albumId: 3,
        songName: "Next Time Around",
        price: 1,
        songUrl: "",
        isExplicit: false,
        uid:"mae4"
      },
      {
        artistId: 3,
        albumId: 3,
        songName: "Down in the Basement",
        price: 1,
        songUrl: "",
        isExplicit: false,
        uid:"mae5"
      },


      {
        artistId: 4,
        albumId: 4,
        songName: "Magnificat Primi Toni",
        price: 1,
        songUrl: "",
        isExplicit: false,
        uid:"str1"
      },
      {
        artistId: 4,
        albumId: 4,
        songName: "Magnificat Secundi Toni",
        price: 1,
        songUrl: "",
        isExplicit: false,
        uid:"str2"
      },
      {
        artistId: 4,
        albumId: 4,
        songName: "Magnificat Tertii Toni",
        price: 1,
        songUrl: "",
        isExplicit: false,
        uid:"str3"
      },
      {
        artistId: 4,
        albumId: 4,
        songName: "Magnificat Quarti Toni",
        price: 1,
        songUrl: "",
        isExplicit: false,
        uid:"str4"
      },
      {
        artistId: 4,
        albumId: 4,
        songName: "Magnificat Quinti Toni",
        price: 1,
        songUrl: "",
        isExplicit: false,
        uid:"str5"
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
