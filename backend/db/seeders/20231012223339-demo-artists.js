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
        name: "Goth Babe",
        description: "Goth Babe is Griff Washburn enjoying himself. Originally from Tennessee, Griff currently lives in a Tiny House with his pup Sadie in the mountains of Washington. When not on the road touring, Griff and Sadie are off enjoying the outdoors in the great Pacific Northwest. Snow, surf, and trails are plenty to occupy them in their offseason. Griff has seemed to have picked up on the brighter parts of life. Parting ways with social status and relevance, he's discovered how wonderful living day by day is. Making music to Griff is less a climb to the top, as it is a form of free thinking and enjoyment.",
        userId: 2
      },
      {
        name: "Rum Jungle",
        description: "Rum Jungle are a hammock swinging between two palm trees, overlooking the ocean. The Newcastle band have emerged as a serious player in one of the country’s most lively music scenes. Touring with Lime Cordiale, Peking Duk, Hilltop Hoods and British India to name a few. The four-piece have developed a devoted fanbase off the back of their first two EPs Crazy Days and Sun & Smoke, and continue to develop their relaxed reggae-rock style with a new EP - EVERYTHING IS EASY. 7 tracks to soundtrack to a cruisy weekend afternoon, the drive home, lazy holidays by the water and endless sunsets.",
        userId: 3
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
    options.tableName = 'Artists';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Goth Babe', 'Rum Jungle'] }
    }, {});

  }
};
