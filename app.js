require('dotenv').config();
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');

// Amazon OAuth requisites

// const util = require("util"),
//   AmazonStrategy = require("passport-amazon").Strategy;


// End of Amazon req

mongoose
	.connect(process.env.MONGODB_URI || 'mongodb://localhost/photoshops-app')
	.then((x) => {
		console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
	})
	.catch((err) => {
		console.error('Error connecting to mongo', err);
	});

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(
	require('node-sass-middleware')({
		src: path.join(__dirname, 'public'),
		dest: path.join(__dirname, 'public'),
		sourceMap: true
	})
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

hbs.registerHelper('ifUndefined', (value, options) => {
	if (arguments.length < 2) throw new Error('Handlebars Helper ifUndefined needs 1 parameter');
	if (typeof value !== undefined) {
		return options.inverse(this);
	} else {
		return options.fn(this);
	}
});

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

// Enable authentication using session + passport
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: true,
		saveUninitialized: true,
		store: new MongoStore({ mongooseConnection: mongoose.connection })
	})
);


app.use(flash());
require('./passport')(app);

app.get("/", function(req, res) {
  res.render("index", { user: req.user });
});

// app.get("/account", ensureAuthenticated, function(req, res) {
//   res.render("account", { user: req.user });
// });

app.get("/login", function(req, res) {
  res.render("login", { user: req.user });
});

// GET /auth/amazon
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Amazon authentication will involve
//   redirecting the user to amazon.com.  After authorization, Amazon
//   will redirect the user back to this application at /auth/amazon/callback
app.get(
  "/auth/amazon",
  passport.authenticate("amazon", { scope: ["profile", "postal_code"] }),
  function(req, res) {
    // The request will be redirected to Amazon for authentication, so this
    // function will not be called.
  }
);

// GET /auth/amazon/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get(
  "/auth/amazon/callback",
  passport.authenticate("amazon", { failureRedirect: "/login" }),
  function(req, res) {
    res.redirect("/");
  }
);

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

// const authRoutes = require("./routes/auth");
// app.use("/auth", authRoutes);

const amzRoutes = require("./routes/amz-routes")
app.use("/", amzRoutes)

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const googleApiRoutes = require('./routes/googleApiRoute');
app.use('/googleApi', googleApiRoutes);

const uploadRoutes = require('./routes/file-upload-routes');
app.use('/api', uploadRoutes);

const productRoutes = require('./routes/products');
app.use('/products', productRoutes);

app.use((req, res) => {
	// If no routes match, send them the React HTML.
	res.sendFile(__dirname + '/client/build/index.html');
});

module.exports = app;
