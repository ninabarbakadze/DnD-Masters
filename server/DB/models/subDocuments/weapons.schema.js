const { mongoose } = require('../../connection');

const { Schema } = mongoose;
const weaponSchema = new Schema({
  name: String,
  damage: {
    dice: {
      sides: Number,
      count: Number,
    },
    type: String,
  },
  equipped: Boolean,
  properties: {
    Versatile: Boolean,
  },
});
module.exports = weaponSchema;
