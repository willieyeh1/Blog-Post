const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User, Post, Comment } = require('../../models');

router.get('/', async (req, res) => {
	try {
		const userData = await User.findAll({ include: [Post, Comment] });
		res.status(200).json(userData);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const userData = await User.findByPk(req.params.id, {
			include: [Post, Comment],
		});
		res.status(200).json(userData);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
});

// Creating new account/user
router.post('/', async (req, res) => {
	try {
		const userData = await User.create({
			email: req.body.email,
			username: req.body.username,
			password: req.body.password,
		});

		req.session.user = {
			id: userData.id,
			username: userData.username,
		};

		req.session.loggedIn = true;

		res.status(201).json(userData);
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: 'error occurred', error });
	}
});

router.post('/login', async (req, res) => {
	try {
		const foundUser = await User.findOne({
			where: {
				username: req.body.username,
			},
		});
		if (!foundUser) {
			return res.status(401).json({ msg: 'invalid email/password combo' });
		}
		// if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
		// 	return res.status(401).json({ msg: 'invalid email/password combo' });
		// }
		const validPassword = await foundUser.checkPassword(req.body.password);

		if (!validPassword) {
			res.status(400).json({
				message: 'Incorrect email or password. Please try again!',
			});
			return;
		}

		// req.session.save(() => {
		// 	req.session.loggedIn = true;
		// 	req.session.user = {
		// 		id: foundUser.id,
		// 		name: foundUser.username,
		// 	};
		// });

		req.session.user = {
			id: foundUser.id,
			username: foundUser.username,
			// email: foundUser.email,
			// password: foundUser.password,
			// loggedIn: false,
		};

		req.session.loggedIn = true;

		// res.status(200).json(userData);
		return res.json(foundUser);
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: 'error occurred', error });
	}
});

router.post('/logout', (req, res) => {
	if (req.session.loggedIn) {
		req.session.destroy(() => {
			res.status(204).json({ msg: 'logged out' });
		});
	} else {
		res.status(404).end();
	}
});

// router.delete('/:id', async (req, res) => {
// 	if (!req.session.user) {
// 		return res.status(403).json({ msg: 'login first!' });
// 	}
// 	try {
// 		const userData = await User.destroy({
// 			where: {
// 				id: req.params.id,
// 				userId: req.session.user.id,
// 			},
// 		});
// 		if (postData === 0) {
// 			return res
// 				.status(404)
// 				.json({ msg: 'no such Post exists or its not yours' });
// 		}
// 		res.json(postData);
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).json({ msg: 'error occurred', error });
// 	}
// });

module.exports = router;
