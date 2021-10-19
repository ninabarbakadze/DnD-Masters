const { mongoose } = require('../../connection');

const { Schema } = mongoose;
const classSchema = new Schema({
  name: String,
  hitDie: Number,
  subtype: String,
  level: Number,
  spellCasting: {
    index: String,
    name: String,
    url: String,
  },
  features: {
    desc: [String],
    name: String,
  },

});
module.exports = classSchema;
