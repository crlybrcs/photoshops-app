const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');

// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

//Code Clip

router.post('/signup', (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;
	console.log('username', username, 'password', password);
	if (!username || !password) {
		res.status(400).json({ message: 'Provide username and password' });
		return;
	}

	if (password.length < 8) {
		res.status(400).json({ message: 'Please make your password at least 8 characters long' });
		return;
	}

	User.findOne({ username }, (err, foundUser) => {
		if (err) {
			res.status(500).json({ message: 'Username check went bad.' });
			return;
		}

		if (foundUser) {
			res.status(400).json({ message: 'Username taken. Choose another one.' });
			return;
		}

		const salt = bcrypt.genSaltSync(10);
		const hashPass = bcrypt.hashSync(password, salt);

		const aNewUser = new User({
			username: username,
			password: hashPass
		});

		aNewUser.save((err) => {
			if (err) {
				res.status(400).json({ message: 'Saving user to database went wrong.' });
				return;
			}

			// Automatically log in user after sign up
			// .login() here is actually predefined passport method
			req.login(aNewUser, (err) => {
				if (err) {
					res.status(500).json({ message: 'Login after signup went bad.' });
					return;
				}

				// Send the user's information to the frontend
				// We can use also: res.status(200).json(req.user);
				res.status(200).json(aNewUser);
			});
		});
	});
});

router.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, user) => {
		if (err) {
			return res.status(500).json({ message: 'Error while authenticating' });
		}
		if (!user) {
			// no user found with username or password didn't match
			return res.status(400).json({ message: 'Invalid credentials' });
		}
		// passport req.login
		req.login(user, (err) => {
			if (err) res.status(500).json(err);
			res.json(user);
		});
	})(req, res, next);
});

router.delete('/logout', (req, res) => {
	// passport logout function
	req.logout();
	res.json({ message: 'Successful logout' });
});

router.get('/loggedin', (req, res) => {
	res.json(req.user);
});

module.exports = router;
