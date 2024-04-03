const express = require('express');
const router = express.Router();
const withAuth = require('../utils/auth')

// Get method
router.get('/', (req, res) => {
	res.render('home', {
		loggedIn: req.session.loggedIn
	})
}
)

router.get('/login', (req, res) => {
	res.render('login')
})

router.get('/addjoke', withAuth, (req, res) => {
	res.render('addJoke', {
		layout: 'addjokepage.handlebars',
		loggedIn: req.session.loggedIn
	})
})

// Session Data
router.get('/sessiondata', (req, res) => {
	res.json(req.session);
});

router.get('/createacct', (req, res) => {
	res.render('createacct')
})

router.get('/profile', (req, res) => {
	res.render('profile')
})

module.exports = router;
