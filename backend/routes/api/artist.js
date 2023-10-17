const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { Album, Artist, Song, User } = require("../../db/models");
const { requireAuth } = require("../../utils/auth")

const router = express.Router();

const validArtist = [
    check('name')
        .exists({checkFalsy: true})
        .isLength({min: 2})
        .withMessage('Name must be 2 characters or longer'),
    check('description')
        .exists({checkFalsy: true})
        .isLength({min: 5})
        .withMessage('Description must be atleast 5 characters long'),
    handleValidationErrors
]

//Become an Artist
router.post("/newArtist", validArtist, requireAuth, async (req, res) => {
    const artistSearch = await Artist.findOne({where: {userId: req.user.id}})
    if (artistSearch === null){
        const { name, description } = req.body
        let newArtist;
        try {
            newArtist = await Artist.create({
                name,
                description,
                userId: req.user.id
            })

            const addedArtist = {
                id: newArtist.id,
                name: newArtist.name,
                description: newArtist.description,
                userId: newArtist.userId,
                createdAt: newArtist.createdAt,
                updatedAt: newArtist.updatedAt
            }
            res.status(201).json(addedArtist)
        }
        catch(error){
            console.log("error creating artist", error)
            if(newArtist){
                await newArtist.destroy()
            }
            res.status(500).json({ message: "Error creating artist" })
        }

    }
    else {
        return res.status(405).json({message: 'User is already an Artist'})
    }
})

//update Artist Page
router.put('/update/:artistId', requireAuth, async (req, res) => {
    const artistId = Number(req.params.artistId)
    const artistFinder = await Artist.findByPk(artistId)
    if(artistFinder === null){ return res.status(404).json({message: "Artist not found"})}
    if (artistFinder.userId !== req.user.id){
        return res.status(403).json({message: "forbidden"})
    }

    try{
        await artistFinder.update(req.body)
        const updated = await Artist.findByPk(artistId)
        const newUp = {
            id: updated.id,
            name: updated.name,
            description: updated.description,
            userId: updated.userId,
            createdAt: updated.createdAt,
            updatedAt: updated.updatedAt,
        }
        return res.status(201).json(newUp)
    }
    catch(error){
        res.status(500).json({"message": "could not update"})
    }


})

//GET artist info
router.get('/:artistId', async (req, res) => {
    const artistFinder = await Artist.findByPk(Number(req.params.artistId))
    if(artistFinder !== null ){
        return res.status(200).json(artistFinder)
    }
    else {
        return res.status(404).json({message: 'Page Does Not Exist'})
    }
})

module.exports = router;
