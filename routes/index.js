const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
	res.json('index');
});

/* GET About page */
router.get('/about', (req, res) => {
	res.render('about');
});

module.exports = router;
