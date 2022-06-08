const express = require('express')
const asyncHandler = require('express-async-handler');

const { Property, Image, Reservation, Support } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');


router.get(
    '/',
    asyncHandler(async (req, res) => {
        const properties = await Property.findAll({
            include: [{ model: User }, { model: Image }, { model: Reservation }, {model: Support}],
            order: [["createdAt", "DESC"]]
        });

        return res.json({
            properties,
        });
    }),
);

router.get(
    `/:id(\\d+)`,
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        const property = await Property.findOne({
            where: { id: id },
            include: [{ model: User }, { model: Image }, { model: Reservation }, { model: Support }],
        });

        return res.json({
            property,
        });
    }),
)

router.put(
    `/:id(\\d+)`,
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        const property = await Property.findOne({
            where: { id: id },
            include: [{ model: User }, { model: Image }, { model: Reservation }, { model: Support }],
        });
        if (property) {
            // await song.update(req.body);
            // await song.save();
            // res.json(song)
            /* split req.body & update images as well */
        }
    }),
)

router.delete(
    `/:id(\\d+)`,
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        const property = await Property.findOne({
            where: { id: id },
            include: [{ model: User }, { model: Image }, { model: Reservation }, { model: Support }],
        });
        if (property) {
            await property.destroy();
        } else {
            res.json('could not find property')
        }
    }),
)

router.post(
    '/',
    asyncHandler(async (req, res) => {
        // const { owner, artistId, image, songUrl } = req.body;
        //change above^  iterate images & create as well
        const newProp = await Property.create({
            // name,
            // artistId,
            // image,
            // songUrl
        });

        return res.json({
            newProp,
        });
    }),
)

module.exports = router