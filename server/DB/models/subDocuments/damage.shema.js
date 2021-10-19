const { mongoose } = require('../../connection');

const { Schema } = mongoose;
const damageSchema = new Schema({

  dice: {
    mod: { type: Number, default: 0 },
    sides: Number,
    count: Number,
  },
  type: String,
});
module.exports = damageSchema;
