const express = require('express');
const router = express.Router();
const withAuth = require('../utils/auth');
const { Comment, Post, User } = require('../models');
const dayjs = require('dayjs');
const axios = require('axios');

// Get method
router.get('/', async (req, res) => {
	let jotd;
	const jokeOftheDay = await axios({
		method: 'get',
		url: 'https://icanhazdadjoke.com/',
		headers: { Accept: 'application/json' },
	})
		.then(function (response) {
			jotd = response.data
		})
		.catch((error) => {
			console.log(error);
		});

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
		const commentData = await Comment.findAll({
			include: [Post, User]
		});
		const comments = commentData.map((comment) => comment.toJSON())

		const dadjokes = dadjokeData.map((jokes) => jokes.toJSON());
		for (let i = 0; i < dadjokes.length; i++) {
			dadjokes[i].createdAt = dayjs(dadjokes[i].createdAt).format('M/D/YYYY');
			const likecount = await dadjokeData[i].countLikes();
			dadjokes[i].likecounter = likecount;
			for (let j = 0; j < comments.length; j++) {
				if (comments[j].post.id === dadjokes[i].id) {
					dadjokes[i].comment[j] = comments.content
					// dadjokes.comments.push(comments[j].content)
				}				
			}
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
		console.log(comments)

		// console.log(jokeOftheDay)
		res.render('home', {
			dadjokes,
			loggedIn: req.session.loggedIn,
			jotd,
			comments,
			layout: 'main2'
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

router.get('/profile', withAuth, async (req, res) => {
	try {
		const userJokeData = await Post.findAll({
			where: { userId: req.session.user.id },
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
			// order: [['id', 'DESC']],
		});
		const userJokes = userJokeData.map((jokes) => jokes.toJSON());
		for (let i = 0; i < userJokes.length; i++) {
			userJokes[i].createdAt = dayjs(userJokes[i].createdAt).format('M/D/YYYY');
			const likecount = await userJokeData[i].countLikes();
			userJokes[i].likecounter = likecount;
		}

		const userJokeDataForSaved = await Post.findAll({
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
			// order: [['id', 'DESC']],
		});

		const userSavedJokes = userJokeDataForSaved.map((jokes) => jokes.toJSON());
		for (let i = 0; i < userSavedJokes.length; i++) {
			for (let j = 0; j < userSavedJokes[i].saves.length; j++) {
				if (userSavedJokes[i].saves[j].id === req.session.user.id) {
					userSavedJokes[i].userSavedPost = true;
				} else {
					userSavedJokes[i].userSavedPost = false;
				}
			}
		}
		// console.log(userJokes)
		console.log(userSavedJokes)

		// console.log(userSavedJokes)
		// // Check bookmarks
		// for (let i = 0; i < dadjokes.length; i++) {
		// 	for (let j = 0; j < dadjokes[i].saves.length; j++) {
		// 		if (dadjokes[i].saves[j].id === req.session.user.id) {
		// 			dadjokes[i].userBookmarkStatus = true;
		// 		} else {
		// 			dadjokes[i].userBookmarkStatus = false;
		// 		}
		// 	}
		// }
		res.render('profile', {
			userJokes,
			userSavedJokes,
			layout: "profilemain",
			loggedIn: req.session.loggedIn
		});


	} catch (err) {
		console.log(err)
		res.status(500).json({ msg: 'error occurred', err })
	}
});

router.get('/changepass', (req, res) => {
	res.render('changepass');
});

module.exports = router;
