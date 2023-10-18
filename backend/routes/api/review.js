const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Album, Artist, Song, Review, User } = require("../../db/models");
const artist = require("../../db/models/artist");

const router = express.Router();

const validRev = [
    check('rating')
        .exists({checkFalsy: true})
        .isFloat({
            min:1,
            max:5
        })
        .withMessage('rating must be 1 - 5'),
    check('ratingDescription')
        .exists({checkFalsy:true})
        .isLength({min: 15})
        .withMessage('Review must be longer than 15 characters'),
    handleValidationErrors
]

//Delete Review
router.delete('/delete/:reviewId', requireAuth, async (req, res) => {
    const findRev = await Review.findByPk(Number(req.params.reviewId))
    if(!findRev){res.status(404).json({message: "Review Not Found"})}
    else if(findRev.userId !== req.user.id){res.status(403).json({message: "forbidden"})}
    else {
        const revAlbumId = findRev.albumId
        await findRev.destroy()
        let revCount = await Review.count({
            where: {
                albumId: revAlbumId,
                rating: {
                    [Op.between]: [1, 5]
                }
            }
        })
        let revSum = await Review.sum('rating', {
            where: {
                albumId: revAlbumId,
                rating: {
                    [Op.between]: [1, 5]
                }
            }
        })
        let avg = revSum / revCount
        const albumRatingUpdate = await Album.update(
            {albumRating: avg},
            {where: {id: revAlbumId}}
        )

        res.status(200).json({message: "Review Successfully Deleted"})
    }
})

//Post review
router.post('/new/:albumId', validRev, requireAuth, async (req, res) => {
    const findAlbum = await Album.findByPk(Number(req.params.albumId), {
        include: [
            {
                model: Artist,
                attributes: ["userId"]
            }
        ]
    })
    const revCheck = await Review.findOne({
        where: {
            userId: req.user.id,
            albumId: Number(req.params.albumId)
        }
    })
    if(findAlbum.Artist.userId === req.user.id){res.status(403).json({message: 'Cant Review your own album'})}
    else if(revCheck){res.status(403).json({message: 'cant review album more than once'})}
    else{
        let newRev;
        const { rating, ratingDescription} = req.body
        try{
            newRev = await Review.create({
                userId: req.user.id,
                albumId: req.params.albumId,
                rating,
                ratingDescription
            })
            let addedRev = {
                id: newRev.id,
                userId: newRev.userId,
                albumId: newRev.albumId,
                rating: newRev.rating,
                ratingDescription: newRev.ratingDescription
            }
            let revCount = await Review.count({
                where: {
                    albumId: Number(req.params.albumId),
                    rating: {
                        [Op.between]: [1, 5]
                    }
                }
            })
            let revSum = await Review.sum('rating', {
                where: {
                    albumId: Number(req.params.albumId),
                    rating: {
                        [Op.between]: [1, 5]
                    }
                }
            })
            let avg = revSum / revCount
            const albumRatingUpdate = await Album.update(
                {albumRating: avg},
                {where: {id: Number(req.params.albumId)}}
            )
            res.status(201).json(addedRev)
        }
        catch(error){
            console.error("Error creating review:", error);
            if (newRev) {
              await newRev.destroy();
            }
            res.status(500).json({ message: "Error creating Review" });
        }
    }
})

//get album Reviews
router.get('/:albumId', requireAuth, async (req, res) => {
   // const albumId = Number(req.params.albumId)
    const revs = await Review.findAll({
        where: {albumId: Number(req.params.albumId)},
        include: [
            {
                model: User,
                attributes: ["id", "firstName", "lastName"]
            }
        ]
    })
    res.status(200).json(revs)
})

module.exports = router;
