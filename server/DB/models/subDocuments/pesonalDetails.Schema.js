const { mongoose } = require('../../connection');

const { Schema } = mongoose;
const detailsSchema = new Schema({
  personality: [String],
  ideal: String,
  bond: String,
  flaw: String,
});
module.export = detailsSchema;
