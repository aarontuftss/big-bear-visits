const express = require('express')
const asyncHandler = require('express-async-handler');

const { Property, Image, Reservation, Support } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');


router.get(
    '/',
    asyncHandler(async (req, res) => {

        return res.json(process.env.GOOGLE_API)
    }),
);

module.exports = router