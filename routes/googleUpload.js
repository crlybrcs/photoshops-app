const express = require("express");
const router = express.Router();

// included model:
const UploadedData = require("../models/UploadedModel");

router.get("/upload", (req, res, next) => {
  UploadedData.find()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => next(err));
});

router.post("/upload/create", (req, res, next) => {
  console.log("body: ", req.body);
  UploadedData.create(req.body).then(newData => {
    console.log("newData: ", newData);
  });
});
