const { mongoose } = require('../../connection');
const traitSchema = require('./traits.scema');
// const abilities = require('./abilities.schema');

const { Schema } = mongoose;
const raceSchema = new Schema({
  name: String,
  size: String,
  traits: [traitSchema],
  subRaces: String,
  // age: String,
  // speed: Number,
  // sizeDescription: String,
  // languages: [String],
  // features: [String],
  // languageDesc: String,
});
module.exports = raceSchema;
