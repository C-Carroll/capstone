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
      },
      {
        name: "Dehd",
        description: "Dehd is an American three-piece indie rock band from Chicago formed in 2015.[1][2] The band consists of members Emily Kempf (bass guitar, vocals), Jason Balla (guitar, vocals), and Eric McGrady (drums).",
        userId: 4
      },
      {
        name: "Griz",
        description: "Funk isn't merely a genre. It's a state of mind. Such is the opinion of GRiZ, the North Detroit-raised musician who spends sunny days and neon-tinted nights in pursuit of good vibrations.",
        userId: 5
      },
      {
        name: "Boyscott",
        description: "Punctuating wistful, daydreamy indie rock with surfy guitar hooks, Boyscott took shape in college dorm rooms and grew into a fully formed band.",
        userId: 6
      },
      {
        name: "Of The Trees",
        description: "Of The Trees is a producer and visual artist originally rooted in Maine, now residing in Denver, Colorado.",
        userId: 7
      },
      {
        name: "Winston Surfshirt",
        description: "Six-piece Sydney collective Winston Surfshirt have spent the past six years establishing themselves as one of Australia's, and the world's, finest indie-R&B outfits. Combining a classic west coast hip-hop sound with the snap of psych-pop and sunny, uniquely Australian charm, the band are a testament to the power of the free-minded and the casually virtuosic.",
        userId: 8
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
