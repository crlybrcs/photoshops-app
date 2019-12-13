const express = require('express');
const router = express.Router();
const passport = require('passport');

// router.get("/", function(req, res) {
//   res.render("index", { user: req.user });
// });

// router.get("/account", ensureAuthenticated, function(req, res) {
//   res.render("account", { user: req.user });
// });

// router.get("/login", function(req, res) {
//   res.render("login", { user: req.user });
// });

// GET /auth/amazon. The first step in Amazon authentication will involve
//   redirecting the user to amazon.com.  After authorization, Amazon
//   will redirect the user back to this routerlication at /auth/amazon/callback
router.get('/auth/amazon', passport.authenticate('amazon', { scope: [ 'profile', 'postal_code' ] }), function(
	req,
	res
) {
	// The request will be redirected to Amazon for authentication, so this
	// function will not be called.
});

// GET /auth/amazon/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/amazon/callback', passport.authenticate('amazon', { failureRedirect: '/login' }), function(req, res) {
	res.redirect('/');
});

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

module.exports = router;
