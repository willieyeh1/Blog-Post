const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../../models');

router.get('/', async (req, res) => {
	try {
		const postData = await Post.findAll();
		res.status(200).json(postData);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const postData = await Post.findByPk(req.params.id);
		res.status(200).json(postData);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
});

router.post('/', async (req, res) => {
	try {
		const postData = await Post.create({
			// email: req.body.email,
			// username: req.body.username,
			// password: req.body.password,
			content: req.body.content,
			userId: req.session.user.id,
		});
		res.status(201).json(postData);
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: 'error occurred', error });
	}
});

module.exports = router;
