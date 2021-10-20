const { mongoose } = require('../../connection');

const { Schema } = mongoose;
const abilitiesSchema = new Schema({

  name: String,
  scores: Number,
  proficient: Boolean,
  // STR: {
  //   type: Number,
  //   default: 0,
  // },
  // DEX: {
  //   type: Number,
  //   default: 0,
  // },
  // CON: {
  //   type: Number,
  //   default: 0,
  // },
  // INT: {
  //   type: Number,
  //   default: 0,
  // },
  // WIS: {
  //   type: Number,
  //   default: 0,
  // },
});
module.exports = abilitiesSchema;
