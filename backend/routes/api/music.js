const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { Album, Artist, Song } = require("../../db/models");
const artist = require("../../db/models/artist");

const router = express.Router();

const validateAlbum = [
  check("albumName")
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage("name is required and must be at least 1 character"),
  check("albumPicture")
    .exists({ checkFalsy: true })
    .isLength({ min: 5 })
    .withMessage("album picture is required"),
  handleValidationErrors,
];

const validateSong = [
  check("songName")
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage("song name is required and must be at least 1 character"),
];

//Post new album
router.post("/album/new", validateAlbum, requireAuth, async (req, res) => {
  const artistSearch = await Artist.findOne({ where: { userId: req.user.id } });
  if (artistSearch !== null) {
    const { albumName, albumPicture, albumPrice, isExplicit } = req.body;
    let newAlbum;
    try {
      newAlbum = await Album.create({
        artistId: artistSearch.id,
        albumName,
        albumPicture,
        albumPrice,
        isExplicit,
      });
      const addedAlbum = {
        id: newAlbum.id,
        artistId: newAlbum.artistId,
        albumName: newAlbum.albumName,
        albumPicture: newAlbum.albumPicture,
        albumPrice: newAlbum.albumPrice,
        isExplicit: newAlbum.isExplicit,
      };
      res.status(201).json(addedAlbum);
    } catch (error) {
      console.log("error creating album", error);
      if (newAlbum) {
        await newAlbum.destroy();
      }
      res.status(500).json({ message: "error creating new album" });
    }
  } else {
    return res
      .status(403)
      .json({ message: "User must be an artist to add music" });
  }
});

//POST new SONG
router.post("/song/:albumId", validateSong, requireAuth, async (req, res) => {
  const artistSearch = await Artist.findOne({ where: { userId: req.user.id } });
  if (artistSearch !== null) {
    const albumSearch = await Album.findByPk(Number(req.params.albumId));
    if (albumSearch.artistId === artistSearch.id) {
      const { songName, price, songUrl, isExplicit, uid } = req.body;
      let newSong;
      try {
        newSong = await Song.create({
          artistId: artistSearch.id,
          albumId: albumSearch.id,
          songName,
          price,
          songUrl,
          isExplicit,
          uid,
        });
        const addedSong = {
          id: newSong.id,
          artistId: newSong.artistId,
          albumId: newSong.albumId,
          songName: newSong.songName,
          price: newSong.price,
          songUrl: newSong.songUrl,
          isExplicit: newSong.isExplicit,
          uid,
        };
        res.status(201).json(addedSong);
      } catch (error) {
        console.log("error adding song", error);
        if (newSong) {
          await newSong.destory();
        }
        res.status(500).json({ message: "error adding song" });
      }
    } else {
      return res
        .status(403)
        .json({ message: "User must be creator of album to add music" });
    }
  } else {
    return res
      .status(403)
      .json({ message: "User must be an artist to add music" });
  }
});

//Get albums by artist
router.get("/artist/:artistId", async (req, res) => {
  const albums = await Album.findAll({
    where: {
      artistId: Number(req.params.artistId),
    },
  });
  return res.status(200).json({ Albums: albums });
});

//GET songs by album ID
router.get("/album/songs/:albumId", async (req, res) => {
  const songs = await Song.findAll({
    where: {
      albumId: Number(req.params.albumId),
    },
  });

  return res.status(200).json({ Songs: songs });
});

// get album by Id
router.get("/album/:albumId", async (req, res) => {
  const albumFinder = await Album.findByPk(Number(req.params.albumId), {
    include: {
      model: Artist,
      attributes: ["name", "userId"],
    },
  });
  if (!albumFinder) {
    res.status(404).json({ message: "Album Not Found" });
  } else {
    res.status(200).json(albumFinder);
  }
});

//delete album
router.delete("/album/:albumId/delete", requireAuth, async (req, res) => {
  const albumFinder = await Album.findByPk(Number(req.params.albumId), {
    include: {
      model: Artist,
      attributes: ["userId"],
    },
  });
  if (!albumFinder) {
    res.status(404).json({ messgae: "Album Not Found" });
  } else if (albumFinder.Artist.userId !== req.user.id) {
    res.status(403).json({ message: "Forbidden" });
  } else {
    await albumFinder.destroy();
    res.status(200).json({ message: "Album Successfully Deleted" });
  }
});

//Delete Song
router.get("/song/:songId", requireAuth, async (req, res) => {
  const songFinder = await Song.findByPk(Number(req.params.songId), {
    include: {
      model: Artist,
      attributes: ["userId"],
    },
  });
  if (!songFinder) {
    res.status(404).json({ message: "Song not found" });
  } else if (songFinder.Artist.userId !== req.user.id) {
    res.status(403).json({ message: "forbidden" });
  } else {
    await songFinder.destroy();
    res.status(200).json({ message: "Song Successfully Deleted" });
  }
  res.json(songFinder);
});

//GET all albums
router.get("/", async (req, res) => {
  const albums = await Album.findAll({
    include: [
      {
        model: Artist,
        attributes: ["name"],
      },
    ],
  });
  //   const formatted = albums.map((alb) => {
  //     const artist = Artist.findByPk(alb.artistId);
  //     return {
  //       album: alb.albumName,
  //       albumPic: alb.albumPicture,
  //       albumRating: alb.albumRating,
  //       albumPrice: alb.albumPrice,
  //       isExplicit: alb.isExplicit,
  //     };
  //   });

  return res.status(200).json({ Albums: albums });
});

module.exports = router;
