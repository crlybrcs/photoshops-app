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

// const express = require("express");
// const router = express.Router();
// //const Project = require("../models/Project");
// const axios = require("axios");

// router.post("/test", (req, res) => {
//   //const keywords = "betty crocker spatula red";

//   const keywords = req.body.keywords;

//   console.log(keywords);
//   axios
//     .all([
//       axios.get(
//         `https://api.zinc.io/v1/search?query=${keywords}&page=1&retailer=amazon`,
//         { auth: { username: process.env.ZINC_USERNAME } }
//       ),
//       axios.get(
//         `https://api.zinc.io/v1/search?query=${keywords}&page=1&retailer=aliexpress`,
//         { auth: { username: process.env.ZINC_USERNAME } }
//       )
//     ])
//     .then(
//       axios
//         .spread(
//           (firstResponse, secondResponse) => {
//             console.log(firstResponse.data, secondResponse.data);
//             res.json(firstResponse.data, secondResponse.data);
//           }
//           // return all projects
//           // Product.find({})
//           //   .populate("products")
//           //   .then(products => {
//           //     res.json(products);
//           //   })
//           //   .catch(err => {
//           //     res.status(500).json(err);
//           //   });
//         )
//         .catch(err => {
//           console.log(err);
//         })
//     );
// });

// module.exports = router;
