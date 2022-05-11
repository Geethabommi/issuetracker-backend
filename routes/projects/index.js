const express = require('express');

const router = express.Router();

router.get('/list', (req, res) => {
  console.log('projects routes');
  return res.end('<h1>Project list</h1>');
});

module.exports = router;
