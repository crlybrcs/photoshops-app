const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const uploadedModelSchema = new Schema({
  keywords: { type: String },
  imageUrl: { type: String, required: true }
});

const uploadedModel = mongoose.model("Thing", uploadedModelSchema);
module.exports = uploadedModel;
