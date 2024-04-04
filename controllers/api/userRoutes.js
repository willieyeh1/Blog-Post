const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User, Post, Comment } = require('../../models');
const mainEmail = require('../../utils/sendemail.js')

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

		await mainEmail(req.body.email, req.body.username)

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

		const validPassword = await foundUser.checkPassword(req.body.password);

		if (!validPassword) {
			res.status(400).json({
				message: 'Incorrect email or password. Please try again!',
			});
			return;
		}

		req.session.user = {
			id: foundUser.id,
			username: foundUser.username,
		};

		req.session.loggedIn = true;

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

router.delete('/:id', async (req, res) => {
	if (!req.session.user) {
		return res.status(403).json({ msg: 'login first!' });
	} else if (req.session.user.id != req.params.id) {
		return res.status(403).json({msg: "You can only delete your own account"})
	}
	User.destroy({
        where: {
            id: req.params.id,
        }
    }).then((data) => {
        if (data===0) {
            return res.status(404).json({msg:"No such user exists!"})
        }
        res.json(data);
    }).catch(err=> {
        console.log(err);
        res.status(500).json({msg:"error occurred", err})
    })
});

module.exports = router;
