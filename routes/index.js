const express = require('express');
const userRoutes = require('./users');
const projectsRoutes = require('./projects');
const issuesRoutes = require('./issues');

const router = express.Router(); // creates a router as a module, loads a middleware function in it, defines some routes, and mounts the router module on a path in the main app.

router.use('/users', userRoutes);
router.use('/projects', projectsRoutes);
router.use('./issues', issuesRoutes);

// router.get('/', (req, res) => {
//   console.log('req', req.url);
//   return res.end("it's woring");
// });

module.exports = router;
