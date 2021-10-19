/* eslint-disable no-underscore-dangle */
const User = require('../DB/models/user.model');
const Character = require('../DB/models/character.model');

const getUsersCharacters = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.find({ username }).populate('characters');
    const { password, ...data } = user;
    req.status(200).send(data);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const createCharacter = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    // console.log('req.body', req.body.race.traits);
    const character = await new Character({ ...req.body, user: user._id });
    character.save();
    user.characters.push(character._id);
    console.log('Character Saved');
    user.save();
    res.status(201).json(character);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const deleteCharacter = async (req, res) => {
  try {
    await Character.findByIdAndDelete(req.params.characterId);
    res.send('Character deleted');
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getCharacter = async (req, res) => {
  try {
    const character = await Character.findById(req.params.characterId);
    res.status(200).send(character);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updateCharacter = async (req, res) => {
  console.log('hit controller');
  try {
    const updatedChar = await Character.findByIdAndUpdate(
      req.params.characterId, req.body, { new: true },
    );
    console.log('controller updated character', updatedChar);
    res.status(201).json(updatedChar);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
module.exports = {
  createCharacter, getUsersCharacters, deleteCharacter, updateCharacter, getCharacter,
};
