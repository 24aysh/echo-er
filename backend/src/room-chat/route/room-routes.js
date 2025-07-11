const express = require('express');
const { getRoom } = require('../roomControl');
const {auth} = require('../../auth-jwt')
const router = express.Router();

router.get('/getRooms',auth, getRoom);

module.exports = router;