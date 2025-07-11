const express = require('express');
const { home } = require('../homeControl');

const router = express.Router();

router.post('/', home);


module.exports = router;