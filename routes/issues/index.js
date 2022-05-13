const express = require('express');

const router = express.Router();

router.get('issues', (req, res) => res.end('<h1>issue route</h1>'));

module.exports = router;
