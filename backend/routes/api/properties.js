const express = require('express')
const asyncHandler = require('express-async-handler');

const { Property, Image, Reservation, Support } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');


router.get(
    '/',
    asyncHandler(async (req, res) => {
        const properties = await Property.findAll({
            include: [ { model: Image }, { model: Reservation }],
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
            include: [{ model: Image }, { model: Reservation },],
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
            include: [{ model: Image }, { model: Reservation }],
        });
        if (property) {
            await property.update(req.body);
            await property.save();
            res.json(property)
            /* split req.body & update images as well */
        }
    }),
)

router.delete(
    `/:id(\\d+)`,
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        // const property = await Property.findOne({
        //     where: { id: id },
        // });
        const property = await Property.findByPk(id)
        if (property) {
            property.destroy();
            res.send('success')
        } else {
            res.json('could not find property')
        }
    }),
)

router.post(
    '/',
    asyncHandler(async (req, res) => {
        const { 
            name,
            address,
            price,
            ownerId,
            city,
            state,
            bedrooms,
            bathrooms,
            maxGuests,
            description,
            imageUrl
        } = req.body;
        //change above^  iterate images & create as well
        const newProp = await Property.create({
            name,
            address,
            city,
            state,
            bedrooms,
            bathrooms,
            maxGuests,
            description,
            price,
            ownerId
        });

        const newImg = await Image.create({
            propertyId: newProp.id,
            link: imageUrl
        })

        return res.json({
            newProp,
        });
    }),
)

module.exports = router