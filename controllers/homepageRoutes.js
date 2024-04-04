const express = require('express');
const router = express.Router();
const withAuth = require('../utils/auth');
const { Comment, Post, User } = require('../models');
const dayjs = require('dayjs');

// Get method
router.get('/', async (req, res) => {
	try {
		const dadjokeData = await Post.findAll({
			include: [
				User,
				{
					model: User,
					as: 'likes',
					attribute: ['id'],
				},
				{
					model: User,
					as: 'saves',
				},
			],
			order: [['id', 'DESC']],
		});
		const dadjokes = dadjokeData.map((jokes) => jokes.toJSON());
		for (let i = 0; i < dadjokes.length; i++) {
			dadjokes[i].createdAt = dayjs(dadjokes[i].createdAt).format('M/D/YYYY');
			const likecount = await dadjokeData[i].countLikes();
			dadjokes[i].likecounter = likecount;
		}

		if (req.session.loggedIn) {
			for (let i = 0; i < dadjokes.length; i++) {
				for (let j = 0; j < dadjokes[i].likes.length; j++) {
					if (dadjokes[i].likes[j].id === req.session.user.id) {
						dadjokes[i].userLikeStatus = true;
					} else {
						dadjokes[i].userLikeStatus = false;
					}
				}
			}

			// Check bookmarks
			for (let i = 0; i < dadjokes.length; i++) {
				for (let j = 0; j < dadjokes[i].saves.length; j++) {
					if (dadjokes[i].saves[j].id === req.session.user.id) {
						dadjokes[i].userBookmarkStatus = true;
					} else {
						dadjokes[i].userBookmarkStatus = false;
					}
				}
			}
		}

		// console.log(dadjokes);

		res.render('home', {
			dadjokes,
			loggedIn: req.session.loggedIn,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.get('/login', (req, res) => {
	if (req.session.loggedIn) {
		res.redirect('/profile');
	}
	res.render('login');
});

router.get('/addjoke', withAuth, (req, res) => {
	res.render('addJoke', {
		layout: 'addjokepage.handlebars',
		loggedIn: req.session.loggedIn,
	});
});

// Session Data
router.get('/sessiondata', (req, res) => {
	res.json(req.session);
});

router.get('/createacct', (req, res) => {
	res.render('createacct');
});

router.get('/profile', (req, res) => {
	res.render('profile');
});

router.get('/changepass', (req, res) => {
	res.render('changepass');
});

module.exports = router;
