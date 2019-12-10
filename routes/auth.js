const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');

// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
const bcryptSalt = 10;


//Code Clip

// authRoutes.post('/signup', (req, res, next) => {
//   const username = req.body.username;
//   const password = req.body.password;

//   if (!username || !password) {
//     res.status(400).json({ message: 'Provide username and password' });
//     return;
//   }

//   if(password.length < 7){
//       res.status(400).json({ message: 'Please make your password at least 8 characters long for security purposes.' });
//       return;
//   }

//   User.findOne({ username }, (err, foundUser) => {

//       if(err){
//           res.status(500).json({message: "Username check went bad."});
//           return;
//       }

//       if (foundUser) {
//           res.status(400).json({ message: 'Username taken. Choose another one.' });
//           return;
//       }

//       const salt     = bcrypt.genSaltSync(10);
//       const hashPass = bcrypt.hashSync(password, salt);

//       const aNewUser = new User({
//           username:username,
//           password: hashPass
//       });

//       aNewUser.save(err => {
//           if (err) {
//               res.status(400).json({ message: 'Saving user to database went wrong.' });
//               return;
//           }
          
//           // Automatically log in user after sign up
//           // .login() here is actually predefined passport method
//           req.login(aNewUser, (err) => {

//               if (err) {
//                   res.status(500).json({ message: 'Login after signup went bad.' });
//                   return;
//               }
          
//               // Send the user's information to the frontend
//               // We can use also: res.status(200).json(req.user);
//               res.status(200).json(aNewUser);
//           });
//       });
//   });
// });

// module.exports = authRoutes;
//Code Clip

router.get('/login', (req, res, next) => {
	res.render('auth/login', { message: req.flash('error') });
});

router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/auth/login',
		failureFlash: true,
		passReqToCallback: true
	})
);

router.get('/signup', (req, res, next) => {
	res.render('auth/signup');
});

router.post('/signup', (req, res, next) => {
  
	const username = req.body.username;
  const password = req.body.password;
  console.log(username, password)
	if (username === '' || password === '') {
		res.render('auth/signup', { message: 'Indicate username and password' });
		return;
	}

	User.findOne({ username }, 'username', (err, user) => {
		if (user !== null) {
			res.render('auth/signup', { message: 'The username already exists' });
			return;
		}

		const salt = bcrypt.genSaltSync(bcryptSalt);
		const hashPass = bcrypt.hashSync(password, salt);

		const newUser = new User({
			username,
			password: hashPass
		});

		newUser
			.save()
			.then(() => {
				res.redirect('/');
			})
			.catch((err) => {
				res.render('auth/signup', { message: 'Something went wrong' });
			});
	});
});

router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

module.exports = router;
