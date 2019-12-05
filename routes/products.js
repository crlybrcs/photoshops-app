const express = require("express");
const router = express.Router();
//const Project = require("../models/Project");
const axios = require("axios");

router.post("/test", (req, res) => {
  console.log("MMMMMMMMMMMMMM", req);
  // const keywords = "betty crocker spatula red";

  // const keywords = req.body.keywords
  axios
    .get(
      `https://api.zinc.io/v1/search?query=${req.body.keywords}&page=1&retailer=amazon`,
      { auth: { username: process.env.ZINC_USERNAME } }
    )
    .then(
      response => {
        console.log("hiiiii");
        res.json(response.data);
      }
      // return all projects
      // Product.find({})
      //   .populate("products")
      //   .then(products => {
      //     res.json(products);
      //   })
      //   .catch(err => {
      //     res.status(500).json(err);
      //   });
    )
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
