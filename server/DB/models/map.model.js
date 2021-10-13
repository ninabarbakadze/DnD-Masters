const { mongoose } = require('../connection');

const { Schema } = mongoose;

const mapSchema = new Schema({
  mapname: String,
  photo: String,
});

const map = mongoose.model('Map', mapSchema);
module.exports = map;
