const { mongoose } = require('../connection');

const { Schema } = mongoose;

const mapSchema = new Schema({
  mapName: String,
  mapUrl: String,
  locationData: String,
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
  },
});

const map = mongoose.model('Map', mapSchema);
module.exports = map;
