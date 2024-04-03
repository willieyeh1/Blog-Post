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

// router.put('/:postId/user/:userId', async (req, res) => {
// 	try {
// 		const data = await Post.findByPk(req.params.postId)
// 		await data.addUser(req.params.userId)
// 		res.json({ msg: "User's like added" })
// 	} catch (err) {
// 		console.log(err)
// 		res.status(500).json({ msg: 'error occurred', err })
// 	}
// })

module.exports = router;
