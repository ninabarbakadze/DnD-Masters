const Map = require('../DB/models/map.model');
const User = require('../DB/models/user.model');

exports.createMap = async (req, res) => {
  try {
    const userData = await User.findOne({ username: req.params.username });
    // eslint-disable-next-line
    const map = await new Map({ ...req.body, user: userData._id });
    // eslint-disable-next-line
    userData.maps.push(map._id)
    map.save();
    userData.save();
    res.send(map);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getAllUserMaps = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).populate('maps');
    // console.log(user.populated('maps'));
    res.send(user.maps);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getUserMap = async (req, res) => {
  try {
    const map = await Map.findById(req.params.mapId);
    res.send(map);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.deleteMap = async (req, res) => {
  try {
    await Map.findByIdAndDelete(req.params.mapId);
    res.send({ message: 'Map deleted' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.updateMap = async (req, res) => {
  try {
    const newMap = await Map.findByIdAndUpdate(req.params.mapId, req.body, { new: true });
    console.log(newMap);
    res.send(newMap);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
