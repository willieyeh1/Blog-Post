const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../../models');
// const dayjs = require('dayjs');
const dayjs = require('dayjs');

router.get('/', async (req, res) => {
	try {
		const commentData = await Comment.findAll({
			include: [Post, { model: User, attributes: ['id', 'username'] }],
		});

		const allComments = commentData.map((comment) => comment.toJSON());
		console.log(allComments);

		for (let i = 0; i < allComments.length; i++) {
			allComments[i].createdAt = dayjs(allComments.createdAt).format('M/D/YY');
		}

		res.status(200).json(allComments);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const commentData = await Comment.findByPk(req.params.id, {
			include: [Post, { model: User, attributes: ['id', 'username'] }],
		});

		const comment = commentData.toJSON();
		comment.createdAt = dayjs(comment.createdAt).format('M/D/YY');

		res.status(200).json(comment);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
});

// Create new comment
router.post('/', async (req, res) => {
	if (!req.session.user) {
		return res.status(403).json({ msg: 'login first!' });
	}
	try {
		const commentData = await Comment.create({
			content: req.body.content,
			postId: req.body.postId,
			userId: req.session.user.id,
		});
		
		res.status(201).json(commentData);
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: 'error occurred', error });
	}
});

// Delete comment
router.delete('/:id', async (req, res) => {
	if (!req.session.user) {
		return res.status(403).json({ msg: 'login first!' });
	}
	try {
		const commentData = await Comment.destroy({
			where: {
				id: req.params.id,
				userId: req.session.user.id,
			},
		});
		if (commentData === 0) {
			return res
				.status(404)
				.json({ msg: 'no such comment exists or its not yours' });
		}
		res.json(commentData);
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: 'error occurred', error });
	}
});

module.exports = router;
