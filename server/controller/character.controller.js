/* eslint-disable no-underscore-dangle */
const User = require('../DB/models/user.model');
const Character = require('../DB/models/character.model');

const getUsersCharacters = async (req, res) => {
  // console.log('hre', req.params);
  try {
    const user = await User.findOne({ username: req.params.username }).populate('characters');
    res.status(200).json(user.characters);
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
  console.log('getChar');
  try {
    const character = await Character.findById(req.params.characterId);
    res.status(200).json(character);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updateCharacter = async (req, res) => {
  console.log('char Update');
  try {
    const updatedChar = await Character.findByIdAndUpdate(
      req.params.characterId, req.body, { new: true },
    );
    res.status(201).json(updatedChar);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
module.exports = {
  createCharacter, getUsersCharacters, deleteCharacter, updateCharacter, getCharacter,
};
