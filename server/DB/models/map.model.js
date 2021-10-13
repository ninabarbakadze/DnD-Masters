const { mongoose } = require('../connection');

const { Schema } = mongoose;

const mapSchema = new Schema({
  mapname: String,
  photo: String,
  password: String,
});

const map = mongoose.model('Map', mapSchema);
module.exports = map;
