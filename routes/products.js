const express = require("express");
const router = express.Router();
//const Project = require("../models/Project");
const axios = require("axios");
const Product = require("../models/Product");
const User = require("../models/User");

router.post("/test/new", (req, res) => {
  const queryString = req.body.keywords.join("+");
  axios.get(`http://567ab4ed.ngrok.io/?query=${queryString}`).then(response => {
    // const price = response.data[0].price;
    // console.log(Number(price.split("$").join("")));
    const smallerRes = [...response.data].slice(0, 12);
    // console.log(smallerRes);
    const products = smallerRes.map(el => {
      const newObj = {};
      newObj.title = el.title;
      newObj.image = el.image;
      const price = el.price.split("$").join("");
      newObj.price = Number(price);
      newObj.num_reviews = el.num_reviews;
      newObj.stars = el.stars;
      newObj.product_id = el.product_id;
      return newObj;
    });
    // const products = response.data.map(el => {
    //   const newObj = {};
    //   newObj.title = el.title;
    //   newObj.image = el.image;
    //   const price = el.price.split("$").join("");
    //   console.log(price);
    //   newObj.price = Number(price);
    //   // newObj.price = Number(el.price.split("$").join(""));
    //   newObj.num_reviews = el.num_reviews;
    //   newObj.stars = el.stars;
    //   newObj.product_id = el.product_id;
    // });
    // console.log(products[0]);
    res.json(products);
  });
});

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
      console.log(response.data.results);
      res.json(response.data);
      // res.json(response.data.results);
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/favorite", (req, res) => {
  // console.log(req.body);
  // const { title, image, price, num_reviews, stars, product_id } = req.body;
  Product.create({ ...req.body }).then(
    // Product.create({ title, image, price, num_reviews, stars, product_id }).then(
    response => {
      const productId = response._id;
      // ADD PRODUCT TO FAVORITES LIST OF USER
      // $PUSH ADDS TO MONGO ARRAY
      User.findByIdAndUpdate(req.user._id, {
        $push: { products: productId }
      }).then(() => {
        // console.log("all good");
        res.json({ message: "Product Successfully added to favorites" });
      });
    }
  );
});

router.put("/favorite", (req, res) => {
  const { product_id } = req.body;
  // INFO FROM  FRONT END. ONLY RELEVANT INFORMATION IS AMAZON ID
  User.findById(req.user._id)
    .populate("products")
    // POPULATE GETS THE ARRAY WITH ALL THE PRODUCTS THERE
    .then(userInfo => {
      // THIS FILTER IS GOING TO RETURN JUST THE OBJECT THAT WERE TRYING TO REMOVE FROM THE USER FAVORITES ARRAY
      const [productToDelete] = userInfo.products.filter(
        el => el.product_id === product_id
      );
      // AND NOW WERE GOING TO REMOVE SAID PRODUCT FROM THE USER PRODUCTS ARRAY
      User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { products: productToDelete._id }
        },
        { new: true }
      ).then(updatedUser => {
        // MESSAGE OF SUCCESS SENT TO USER
        res.json({ message: "Product Removed From Favorites" });
        // PRODUCT NO LONGER RELEVANT ENOUGH TO KEEP IN DATABASE. TIME TO DELETE
        Product.findByIdAndDelete(productToDelete._id).then(deletedSuccess => {
          // HERE IT SINGLAS THAT SAID PRODUCT WAS DELETED
          console.log("deletedSuccess");
        });
      });
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
