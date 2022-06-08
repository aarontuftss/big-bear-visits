const express = require('express')
const asyncHandler = require('express-async-handler');

const { Property, Image, Reservation, Support } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');


router.get(
    '/',
    asyncHandler(async (req, res) => {
        const supports = await Support.findAll({
            include: [{ model: User }, { model: Image }, { model: Property }, { model: Reservation }],
            order: [["createdAt", "DESC"]]
        });

        return res.json({
            supports,
        });
    }),
);

router.get(
    `/:id(\\d+)`,
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        const support = await Support.findOne({
            where: { id: id },
            include: [{ model: User }, { model: Image }, { model: Property }, { model: Reservation }],
        });

        return res.json({
            support,
        });
    }),
)

router.put(
    `/:id(\\d+)`,
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        const support = await Support.findOne({
            where: { id: id },
            include: [{ model: User }, { model: Image }, { model: Property }, { model: Reservation }],
        });
        if (support) {
            await support.update(req.body);
            await support.save();
            res.json(support)
        }
    }),
)

router.delete(
    `/:id(\\d+)`,
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        const support = await Support.findOne({
            where: { id: id },
            include: [{ model: User }, { model: Image }, { model: Property }, { model: Support }],
        });
        if (support) {
            await support.destroy();
        } else {
            res.json('could not find support ticket')
        }
    }),
)

router.post(
    '/',
    asyncHandler(async (req, res) => {
        const { reservationId, userId, text } = req.body;
        const newSupport = await Support.create({
            reservationId, 
            userId, 
            text
        });

        return res.json({
            newSupport,
        });
    }),
)

module.exports = router