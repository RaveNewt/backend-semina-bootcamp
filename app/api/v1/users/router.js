const express = require('express');
const router = express.Router();
const {getAllUsers} = require('./controller');

/* GET users listing. */
router.get('/users', getAllUsers);

module.exports = router;