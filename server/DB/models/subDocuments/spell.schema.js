const { mongoose } = require('../../connection');

const { Schema } = mongoose;
const spellSchema = new Schema({
  name: String,
  desc: String,
  higherLevel: [String],
  range: String,
  components: [String],
  material: String,
  ritual: Boolean,
  duration: String,
  concentration: Boolean,
  castingTime: String,
  level: Number,
  school: { name: String },
  dc: { name: String },
  areaOfEffect: { effectType: String, size: Number },
  classes: [String],
  subClasses: [String],
});
module.exports = spellSchema;
