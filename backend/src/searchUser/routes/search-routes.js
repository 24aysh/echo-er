const express = require('express');
const { findUser, addUser } = require('../search-controller');
const {auth} = require('../../auth-jwt')
const router = express.Router();

router.get('/findUser', auth,findUser);
router.post('/addUserToRoom',auth,addUser)

module.exports = router;