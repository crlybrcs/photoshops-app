const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

router.get(
  "https://api.zinc.io/v1/search?query=nike air&page=1&retailer=amazon",
  (req, res) => {
    // return all projects
    Project.find({})
      .populate("tasks")
      .then(projects => {
        res.json(projects);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
);
