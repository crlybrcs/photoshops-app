const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const thingSchema = new Schema({
	imageUrl: { type: String, required: true }
});

const Thing = mongoose.model('Thing', thingSchema);
module.exports = Thing;
