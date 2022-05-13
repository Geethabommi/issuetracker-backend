const express = require('express');

const router = express.Router();

router.get('/list/:projectId', (req, res) => {
  console.log('projects routes', req.params);
  console.log(req.query);
  return res.json({ user: 'tobi' });
});

router.get('/issues', (req, res) => {
  return res.end('<h1>issues</h1>');
});
module.exports = router;
