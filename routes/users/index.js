const express = require('express');

const router = express.Router();

router.get('/login', (req, res) => {
  console.log('users routes');
  return res.end('<h1>Please login </h1>');
});

module.exports = router;
