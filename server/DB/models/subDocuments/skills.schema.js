const { mongoose } = require('../../connection');

const { Schema } = mongoose;
const skillsSchema = new Schema({
  nam: String,
  ability: String,
  proficient: Boolean,
  // athletics: {
  //   type: Number,
  //   default: 0,
  // },
  // acrobatics: {
  //   type: Number,
  //   default: 0,
  // },
  // sleightOfHand: {
  //   type: Number,
  //   default: 0,
  // },
  // stealth: {
  //   type: Number,
  //   default: 0,
  // },
  // intelligence: {
  //   type: Number,
  //   default: 0,
  // },
  // arcana: {
  //   type: Number,
  //   default: 0,
  // },
  // history: {
  //   type: Number,
  //   default: 0,
  // },
  // investigation: {
  //   type: Number,
  //   default: 0,
  // },
  // nature: {
  //   type: Number,
  //   default: 0,
  // },
  // religion: {
  //   type: Number,
  //   default: 0,
  // },
  // wisdom: {
  //   type: Number,
  //   default: 0,
  // },
  // animalHandling: {
  //   type: Number,
  //   default: 0,
  // },
  // insight: {
  //   type: Number,
  //   default: 0,
  // },
  // medicine: {
  //   type: Number,
  //   default: 0,
  // },
  // perception: {
  //   type: Number,
  //   default: 0,
  // },
  // survival: {
  //   type: Number,
  //   default: 0,
  // },
  // charisma: {
  //   type: Number,
  //   default: 0,
  // },
  // deception: {
  //   type: Number,
  //   default: 0,
  // },
  // intimidation: {
  //   type: Number,
  //   default: 0,
  // },
  // performance: {
  //   type: Number,
  //   default: 0,
  // },
  // persuasion: {
  //   type: Number,
  //   default: 0,
  // },
});
module.exports = skillsSchema;
