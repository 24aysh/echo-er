const express = require('express');
const { updateMessage,loadMessage } = require('../chatController');
const {auth} = require('../../auth-jwt')
const router = express.Router();

router.post('/update', auth, updateMessage);
router.get('/receive',auth,loadMessage)

module.exports = router;