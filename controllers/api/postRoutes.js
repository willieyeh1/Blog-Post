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

// Create new post
router.post('/', async (req, res) => {
	if (!req.session.user) {
		return res.status(403).json({ msg: 'login first!' });
	}
	try {
		const postData = await Post.create({
			content: req.body.content,
			userId: req.session.user.id,
		});
		res.status(201).json(postData);
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: 'error occurred', error });
	}
});

// Delete post
router.delete('/:id', async (req, res) => {
	if (!req.session.user) {
		return res.status(403).json({ msg: 'login first!' });
	}
	try {
		const postData = await Post.destroy({
			where: {
				id: req.params.id,
				userId: req.session.user.id,
			},
		});
		if (postData === 0) {
			return res
				.status(404)
				.json({ msg: 'no such Post exists or its not yours' });
		}
		res.json(postData);
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: 'error occurred', error });
	}
});

module.exports = router;
