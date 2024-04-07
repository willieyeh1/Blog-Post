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
			jotd = response.data;
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
				{
					model: Comment,
					include: [User],
					attribute: ['date'],
				},
			],
			order: [['id', 'DESC']],
		});
		// const commentData = await Comment.findAll({
		// 	include: [Post, User]
		// });
		// const comments = commentData.map((comment) => comment.toJSON())

		const dadjokes = dadjokeData.map((jokes) => jokes.toJSON());
		for (let i = 0; i < dadjokes.length; i++) {
			dadjokes[i].createdAt = dayjs(dadjokes[i].createdAt).format('M/D/YY');
			const likecount = await dadjokeData[i].countLikes();
			dadjokes[i].likecounter = likecount;
			if (dadjokes[i].comments.length > 0) {
				for (let j = 0; j < dadjokes[i].comments.length; j++) {
					dadjokes[i].comments[j].createdAt = dayjs(
						dadjokes[i].comments[j].createdAt
					).format('M/D/YY');
				}
			}

			// for (let j = 0; j < comments.length; j++) {
			// 	if (comments[j].post.id === dadjokes[i].id) {
			// 		dadjokes[i].comment[j] = comments.content
			// 	}
			// }
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
		console.log(dadjokes);

		// console.log(jokeOftheDay)
		res.render('home', {
			dadjokes,
			loggedIn: req.session.loggedIn,
			jotd,
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
		});
		const userJokes = userJokeData.map((jokes) => jokes.toJSON());
		for (let i = 0; i < userJokes.length; i++) {
			userJokes[i].createdAt = dayjs(userJokes[i].createdAt).format('M/D/YYYY');
			const likecount = await userJokeData[i].countLikes();
			userJokes[i].likecounter = likecount;
		}

		const userSavedData = await User.findByPk(req.session.user.id, {
			include: [
				{
					association: 'saves',
					include: [
						User,
						{
							association: 'likes',
						},
					],
				},
			],
		});

		const userData = userSavedData.toJSON();

		for (let i = 0; i < userData.saves.length; i++) {
			userData.saves[i].likecount = userSavedData.saves[i].likes.length;
		}

		res.render('profile', {
			userJokes,
			userData,
			layout: 'profilemain',
			loggedIn: req.session.loggedIn,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ msg: 'error occurred', err });
	}
});

router.get('/profile/:id', withAuth, async (req, res) => {
	try {
		const userJokeData = await Post.findAll({
			where: { userId: req.params.id },
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
				{
					model: Comment,
					include: [User],
					attribute: ['date'],
				},
			],
		});
		const userJokes = userJokeData.map((jokes) => jokes.toJSON());
		for (let i = 0; i < userJokes.length; i++) {
			userJokes[i].createdAt = dayjs(userJokes[i].createdAt).format('M/D/YYYY');
			const likecount = await userJokeData[i].countLikes();
			userJokes[i].likecounter = likecount;
			if (userJokes[i].comments.length > 0) {
				for (let j = 0; j < userJokes[i].comments.length; j++) {
					userJokes[i].comments[j].createdAt = dayjs(
						userJokes[i].comments[j].createdAt
					).format('M/D/YY');
				}
			}
		}

		if (req.session.loggedIn) {
			for (let i = 0; i < userJokes.length; i++) {
				for (let j = 0; j < userJokes[i].likes.length; j++) {
					if (userJokes[i].likes[j].id === req.session.user.id) {
						userJokes[i].userLikeStatus = true;
					} else {
						userJokes[i].userLikeStatus = false;
					}
				}
			}

			// Check bookmarks
			for (let i = 0; i < userJokes.length; i++) {
				for (let j = 0; j < userJokes[i].saves.length; j++) {
					if (userJokes[i].saves[j].id === req.session.user.id) {
						userJokes[i].userBookmarkStatus = true;
					} else {
						userJokes[i].userBookmarkStatus = false;
					}
				}
			}
		}

		const userProfile = await User.findByPk(req.params.id);
		const user = userProfile.toJSON();

		console.log(userJokes);

		res.render('userprofile', {
			userJokes,
			loggedIn: req.session.loggedIn,
			user,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ msg: 'error occurred', err });
	}
});

router.get('/changepass', async (req, res) => {
	res.render('changepass');
});

module.exports = router;
