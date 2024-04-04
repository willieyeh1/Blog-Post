const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../../models');
const dayjs = require('dayjs');

router.get('/', async (req, res) => {
	try {
		const postData = await Post.findAll();

		const allPosts = postData.map((post) => post.toJSON());
		// console.log(allPosts);

		for (let i = 0; i < allPosts.length; i++) {
			allPosts[i].createdAt = dayjs(allPosts.createdAt).format('M/D/YY');
		}

		res.status(200).json(allPosts);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const postData = await Post.findByPk(req.params.id, {
			include: [
				User,
				{
					model: User,
					as: 'likes',
				},
				{
					model: User,
					as: 'saves',
				},
			],
		});
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
			content: req.body.setup,
			punchline: req.body.punchline,
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

// Like Post
router.put('/:postId/user', async (req, res) => {
	try {
		const data = await Post.findByPk(req.params.postId);
		await data.addLike(req.session.user.id);
		const count = await data.countLikes();
		console.log(count);
		res.json({ msg: "User's like added" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ msg: 'error occurred', err });
	}
});

// Unlike Post
router.delete('/:postId/user', async (req, res) => {
	try {
		const data = await Post.findByPk(req.params.postId);
		await data.removeLike(req.session.user.id);
		res.json({ msg: "User's has unliked the post" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ msg: 'error occurred', err });
	}
});

// Save Post
router.put('/:postId/usersaves', async (req, res) => {
	try {
		const data = await Post.findByPk(req.params.postId);
		await data.addSave(req.session.user.id);
		// const count = await data.countLikes();
		// console.log(count);
		res.json({ msg: "User's save added" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ msg: 'error occurred', err });
	}
});

// Unsave Post
router.delete('/:postId/usersaves', async (req, res) => {
	try {
		const data = await Post.findByPk(req.params.postId);
		await data.removeSave(req.session.user.id);
		res.json({ msg: "User's has unsaved the post" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ msg: 'error occurred', err });
	}
});

module.exports = router;
