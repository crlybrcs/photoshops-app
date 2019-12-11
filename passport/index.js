const passport = require('passport');
const User = require('../models/User');
require('./serializers');
require('./localStrategy');

// Google Oath s
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new AmazonStrategy(
    {
      clientID: amzID,
      clientSecret: amzClientSecret,
      callbackURL: "http://127.0.0.1:3000/auth/amazon/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function() {
        // To keep the example simple, the user's Amazon profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the Amazon account with a user record in your database,
        // and return that user instead.
        return done(null, profile);
      });
    }
  )
);

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: 'http://localhost:5555/api/auth/google/callback',
			scope: [ 'profile' ]
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleId: profile.id })
				.then((user) => {
					if (user) {
						console.log('User', user);
						done(null, user);
					} else {
						return User.create({
							googleId: profile.id,
							username: profile.displayName
						}).then((newUser) => {
							done(null, newUser);
						});
					}
				})
				.catch((err) => {
					console.log('error', err);
					done(err);
				});
		}
	)
);

module.exports = (app) => {
	app.use(passport.initialize());
	app.use(passport.session());
};
