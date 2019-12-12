const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', (req, res) => {
	console.log(req.body);
	User.findByIdAndUpdate(req.user._id, { ...req.body }, { new: true }).then((user) => {
		console.log(user);
		res.json({ user, message: 'updated' });
	});
});

module.exports = router;
