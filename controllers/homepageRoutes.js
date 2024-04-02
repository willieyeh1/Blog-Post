const express = require('express');
const router = express.Router();

// Get method

// Session Data
router.get('/sessiondata', (req, res) => {
	res.json(req.session);
});

module.exports = router;
