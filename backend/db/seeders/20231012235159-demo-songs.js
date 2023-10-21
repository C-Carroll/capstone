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

      //Dehd
      {
        artistId: 3,
        albumId: 5,
        songName: "Desire",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=vXB5MH6KeHs",
        isExplicit: false
      },
      {
        artistId: 3,
        albumId: 5,
        songName: "Loner",
        price: 1,
        songUrl: "https://youtu.be/isAjA8VUkc4?si=Djia0nVu6ui7tkgW",
        isExplicit: false
      },
      {
        artistId: 3,
        albumId: 5,
        songName: "Haha",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=n0kThZYGx24",
        isExplicit: false
      },
      {
        artistId: 3,
        albumId: 5,
        songName: "Drip Drop",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=oI8R73zgr1o",
        isExplicit: false
      },
      {
        artistId: 3,
        albumId: 5,
        songName: "Month",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=tPnm0OkDduM",
        isExplicit: false
      },
      {
        artistId: 3,
        albumId: 5,
        songName: "Disappear",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=5D-Kx4t8GsQ",
        isExplicit: false
      },
      {
        artistId: 3,
        albumId: 5,
        songName: "Flood",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=fwvnDNJFjUk",
        isExplicit: false
      },
      {
        artistId: 3,
        albumId: 5,
        songName: "Letter",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=f-ozktCpop0",
        isExplicit: false
      },
      {
        artistId: 3,
        albumId: 5,
        songName: "Nobody",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=fepuJ7WB3pg",
        isExplicit: false
      },
      {
        artistId: 3,
        albumId: 5,
        songName: "No Time",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=94KKNtpUEzw",
        isExplicit: false
      },
      {
        artistId: 3,
        albumId: 5,
        songName: "Moonlight",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=10dT8BZduOs",
        isExplicit: false
      },
      {
        artistId: 3,
        albumId: 5,
        songName: "Apart",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=dqxPsrwV_Jc",
        isExplicit: false
      },
      {
        artistId: 3,
        albumId: 5,
        songName: "Flying",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=rrYhIszSFjY",
        isExplicit: false
      },

      //Griz
      {
        artistId: 4,
        albumId: 6,
        songName: "Mystik Dub",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=NfIExRiCoc0",
        isExplicit: false
      },
      {
        artistId: 4,
        albumId: 6,
        songName: "Your Light",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=sL0cx39Bt0M",
        isExplicit: false
      },
      {
        artistId: 4,
        albumId: 6,
        songName: "Keep Bouncin'",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=3v6ePdFtXlI",
        isExplicit: false
      },
      {
        artistId: 4,
        albumId: 6,
        songName: "Airplane Mode",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=cNepCLQ7gqs",
        isExplicit: false
      },
      {
        artistId: 4,
        albumId: 6,
        songName: "Carry On",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=glC334ZtZR0",
        isExplicit: false
      },
      {
        artistId: 4,
        albumId: 6,
        songName: "Gooey",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=e1JZLA3UvPs",
        isExplicit: false
      },
      {
        artistId: 4,
        albumId: 6,
        songName: "On a High",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=eRmrAOpgE6M",
        isExplicit: false
      },
      {
        artistId: 4,
        albumId: 6,
        songName: "4 Your Mind",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=H6W0zdy_HNg",
        isExplicit: false
      },
      {
        artistId: 4,
        albumId: 6,
        songName: "Sundown",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=MYSHsVxO9HY",
        isExplicit: false
      },

      //Boyscott
      {
        artistId: 5,
        albumId: 7,
        songName: "Sleepwalk",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=E_WrhYsWg_k",
        isExplicit: false
      },
      {
        artistId: 5,
        albumId: 7,
        songName: "Blonde Blood",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=YR2JulDiA7s",
        isExplicit: false
      },
      {
        artistId: 5,
        albumId: 7,
        songName: "Nova Scotia 500",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=GmAghX898Qo",
        isExplicit: false
      },
      {
        artistId: 5,
        albumId: 7,
        songName: "Marco Polo",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=8O2UThXuESw",
        isExplicit: false
      },
      {
        artistId: 5,
        albumId: 7,
        songName: "Sinking Down",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=XjoME7taQUY",
        isExplicit: false
      },
      {
        artistId: 5,
        albumId: 7,
        songName: "RIP Sophie Moore",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=z3yZhsqwQsg",
        isExplicit: false
      },
      {
        artistId: 5,
        albumId: 7,
        songName: "Killer Whale",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=md66Tu5UMXQ",
        isExplicit: false
      },
      {
        artistId: 5,
        albumId: 7,
        songName: "Lake House",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=X4QZ-U6SFVM",
        isExplicit: false
      },
      {
        artistId: 5,
        albumId: 7,
        songName: "Embarrassingly Enough",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=ww43TbdxwZ8",
        isExplicit: false
      },
      {
        artistId: 5,
        albumId: 7,
        songName: "Sleepaway",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=81HPbeVXltY",
        isExplicit: false
      },

      //of the trees
      {
        artistId: 6,
        albumId: 8,
        songName: "Alcyone (Intro)",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=WaFHzfp3EeE",
        isExplicit: false
      },
      {
        artistId: 6,
        albumId: 8,
        songName: "Windhorse (feat. Sophie Marks)",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=QkTIrTkrupc",
        isExplicit: false
      },
      {
        artistId: 6,
        albumId: 8,
        songName: "The Bellmaker (feat. Kala)",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=deVtkvxqoj8",
        isExplicit: false
      },
      {
        artistId: 6,
        albumId: 8,
        songName: "I'll Be Ready (feat. Mary Corso)",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=LAplqA9JkNk",
        isExplicit: false
      },
      {
        artistId: 6,
        albumId: 8,
        songName: "Elegos",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=4jLI6BAFNp4",
        isExplicit: false
      },

      //Winston Surfshirt
      {
        artistId: 7,
        albumId: 9,
        songName: "Need You",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=X0TSNp1WpNI",
        isExplicit: false
      },
      {
        artistId: 7,
        albumId: 9,
        songName: "For the Record",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=mbDIESWRcfg",
        isExplicit: false
      },
      {
        artistId: 7,
        albumId: 9,
        songName: "Since I Saw You There",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=1yGUfDlOOYY",
        isExplicit: false
      },
      {
        artistId: 7,
        albumId: 9,
        songName: "That Just Dont Sit Right",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=cthd4v6GiUg",
        isExplicit: false
      },
      {
        artistId: 7,
        albumId: 9,
        songName: "NobodyLikeYou",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=JaCbzaO-xsU",
        isExplicit: false
      },
      {
        artistId: 7,
        albumId: 9,
        songName: "Show Love",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=pwfDwXSbMnQ",
        isExplicit: false
      },
      {
        artistId: 7,
        albumId: 9,
        songName: "Smile",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=bcar1hUxwmc",
        isExplicit: false
      },
      {
        artistId: 7,
        albumId: 9,
        songName: "Where Did All Your Love Go?",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=qkqp0PamWGI",
        isExplicit: false
      },
      {
        artistId: 7,
        albumId: 9,
        songName: "Make a Move",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=iyLmbQFrYYA",
        isExplicit: false
      },
      {
        artistId: 7,
        albumId: 9,
        songName: "Crypto",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=LhUmXfuhjTg",
        isExplicit: false
      },
      {
        artistId: 7,
        albumId: 9,
        songName: "Someone New",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=nrxE1YNbyrU",
        isExplicit: false
      },
      {
        artistId: 7,
        albumId: 9,
        songName: "Bolney Stage 2",
        price: 1,
        songUrl: "https://www.youtube.com/watch?v=-SDE91W0BYY",
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
