const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');

router.get(
	'/auth/google',
	passport.authenticate('google', {
		scope: [ 'https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email' ]
	})
);
router.get(
	'/auth/google/callback',
	passport.authenticate('google', {
		successRedirect: '/private-page',
		failureRedirect: '/' // here you would redirect to the login page using traditional login approach
	})
);
