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
const Product = require('../models/Product');

// include CLOUDINARY:
// const uploader = require('../configs/cloudinary-setup');

router.post('/upload/create', (req, res, next) => {
	console.log('body: ', req.body);
	const { name, description, imageUrl } = req.body;
	console.log('ERRRORRRRRRR');
	Product.create({
		title: name,
		product_details: description,
		image: imageUrl
	}).then((product) => {
		console.log('newData: ', product);
	});
});

// router.post('/upload', uploader.single('imageUrl'), (req, res, next) => {
// 	console.log('file is: ', req.file);

// 	if (!req.file) {
// 		next(new Error('No file uploaded!'));
// 		return;
// 	}

// 	// get secure_url from the file object and save it in the
// 	// variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
// 	res.json({ secure_url: req.file.secure_url }).then(console.log('completed'));
// });

module.exports = router;
