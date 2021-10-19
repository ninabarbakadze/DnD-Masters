const { mongoose } = require('../../connection');

const { Schema } = mongoose;
const traitSchema = new Schema(
  {
    index: String,
    name: String,
    url: String,
  },
);
module.exports = traitSchema;
