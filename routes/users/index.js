const express = require('express');
const { userSignup } = require('../../controller/users');

const router = express.Router();

router.get('/login', userSignup);

module.exports = router;
