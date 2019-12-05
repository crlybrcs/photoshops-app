// const express = require("express");
// const router = express.Router();

// // included model:
// const UploadedData = require("../models/UploadedModel");

// router.get("/upload", (req, res, next) => {
//   UploadedData.find()
//     .then(response => {
//       res.status(200).json(response);
//     })
//     .catch(err => next(err));
// });

const express = require('express');
const router = express.Router();
const Thing = require('../models/thing-model');

// include CLOUDINARY:
const uploader = require('../configs/cloudinary-setup');

router.post('/upload/create', (req, res, next) => {
	console.log('body: ', req.body);
	Thing.create(req.body).then((newData) => {
		console.log('newData: ', newData);
	});
});

router.post('/upload', uploader.single('imageUrl'), (req, res, next) => {
	console.log('file is: ', req.file);

	if (!req.file) {
		next(new Error('No file uploaded!'));
		return;
	}
	// get secure_url from the file object and save it in the
	// variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
	console.log(res.json({ secure_url: req.file.secure_url }));
	res.json({ secure_url: req.file.secure_url });
});

module.exports = router;
