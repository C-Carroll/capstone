'use strict';
const { Artist } = require('../models');

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
    await Artist.bulkCreate([
      {
        name: "The Cleveland Orchestra",
        description: 'The Cleveland Orchestra is an American orchestra based in Cleveland, Ohio. Founded in 1918 by the pianist and impresario Adella Prentiss Hughes, the orchestra is one of the five American orchestras informally referred to as the "Big Five".',
        userId: 2
      },
      {
        name: "Achachak",
        description: 'Composer of classical music and music for film. Also an audio engineer, author and scientist.',
        userId: 3
      },
      {
        name: "Maestro One",
        description: 'UK musician creating live in the room Lo-fi recordings of original instrumental tracks in different genres.',
        userId: 4
      },      {
        name: "stripedgazelle",
        description: 'The StripedGazelle refers to a mythic animal whose birth I witnessed in a dream in 1991.',
        userId: 5
      },


    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Artists';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Goth Babe', 'Rum Jungle'] }
    }, {});

  }
};
