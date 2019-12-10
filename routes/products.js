const express = require("express");
const router = express.Router();
//const Project = require("../models/Project");
const axios = require("axios");

router.post("/test", (req, res) => {
  //const keywords = "betty crocker spatula red";

  const keywords = req.body.keywords;

  console.log(keywords);
  axios
    .get(
      `https://api.zinc.io/v1/search?query=${keywords}&page=1&retailer=amazon`,
      { auth: { username: process.env.ZINC_USERNAME } }
    )
    .then(response => {
      console.log("hiiiii");
      res.json(response.data);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const axios = require("axios");

// router.post("/test", (req, res) => {
//   //const keywords = "betty crocker spatula red";

//   const keywords = req.body.keywords;

//   console.log(keywords);

//   const promises = ["amazon"].map(retailer => {
//     return axios.get(
//       `https://api.zinc.io/v1/search?query=${keywords}&page=1&retailer=${retailer}`,
//       { auth: { username: process.env.ZINC_USERNAME } }
//     );
//   });

//   Promise.all(promises)
//     .then(responses => {
//       console.log(
//         "1",
//         responses.map(response => response.data)
//       );
//       res.json(responses.map(response => response.data));
//     })
//     .catch(error => console.log(error.response));
// });

// module.exports = router;
