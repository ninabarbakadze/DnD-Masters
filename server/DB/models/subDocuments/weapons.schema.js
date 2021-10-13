const { mongoose } = require('../../connection');

const { Schema } = mongoose;
const weaponSchema = new Schema({
  weapon: String,
  damageType: String,
  range: { type: Number, default: 5 },
  attackBonus: { type: Number, default: 0 },
});
module.exports = weaponSchema;
