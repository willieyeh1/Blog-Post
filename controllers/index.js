const express = require('express');
const router = express.Router();
const apiRoutes = require('./api');

const homeRoute = require('./homepageRoutes');
router.use('/', homeRoute);

router.use('/api', apiRoutes);

router.get("*",(req,res)=>{
    res.render('error')
    // res.status(404).send("no such page!")
})

module.exports = router;
