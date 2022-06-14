const express = require('express')
const asyncHandler = require('express-async-handler');

const { Property, Image, Reservation, Support } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');


router.get(
    '/',
    asyncHandler(async (req, res) => {
        const reservations = await Reservation.findAll({
            include: [{ model: Support }],
            order: [["createdAt", "DESC"]]
        });

        return res.json({
            reservations,
        });
    }),
);

router.get(
    `/:id(\\d+)`,
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        const reservation = await Reservation.findOne({
            where: { id: id },
            include: [{ model: Support }],
        });

        return res.json({
            reservation,
        });
    }),
)

router.put(
    `/:id(\\d+)`,
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        console.log(id)
        const reservation = await Reservation.findOne({
            where: { id: id },
            include: [{ model: Support }],
        });
        if (reservation) {
            await reservation.update(req.body);
            await reservation.save();
            res.json(reservation)
        }
    }),
)

router.delete(
    `/:id(\\d+)`,
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        const reservation = await Reservation.findOne({
            where: { id: id },
            include: [{ model: Support }],
        });
        if (reservation) {
            await reservation.destroy();
            res.send('success')
        } else {
            res.json('could not find reservation')
        }
    }),
)

router.post(
    '/',
    asyncHandler(async (req, res) => {
        const { propertyId, renterId, startDate, endDate } = req.body;
        const newReservation = await Reservation.create({
            propertyId, 
            renterId, 
            startDate, 
            endDate
        });

        return res.json({
            newReservation,
        });
    }),
)

module.exports = router