const { mongoose } = require('../../connection');
const abilities = require('./abilities.schema');

const { Schema } = mongoose;
const raceSchema = new Schema({
  name: String,
  speed: Number,
  age: String,
  size: String,
  sizeDescription: String,
  abilityModifier: abilities,
  languages: [String],
  features: [String],
  languageDesc: String,
  traits: [String],
  subRaces: [String],
});
module.exports = raceSchema;
