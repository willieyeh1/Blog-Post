const express = require('express');
const router = express.Router();
const apiRoutes = require('./api');

const homeRoute = require('./homepageRoutes');
router.use('/', homeRoute);

router.use('/api', apiRoutes);

module.exports = router;
