const { mongoose } = require('../../connection');
const damages = require('./damage.shema');

const { Schema } = mongoose;
const weaponSchema = new Schema({
  name: String,
  equipped: { type: Boolean, default: false },
  damage: damages,
  properties: {
    Versatile: { type: Boolean, default: false },
    Finesse: { type: Boolean, default: false },
    Light: { type: Boolean, default: false },
    Thrown: { type: Boolean, default: false },
  },
  throw_range: {
    short: { type: Number, default: 0 },
    long: { type: Number, default: 0 },
  },
});
module.exports = weaponSchema;
