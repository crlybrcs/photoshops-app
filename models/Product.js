const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: String,
  image: String,
  price: Number,
  num_reviews: Number,
  stars: Number,
  product_id: String
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
