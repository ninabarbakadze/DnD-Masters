const router = require('express').Router();
const { register, logIn, getUser } = require('./controller/user.controller');
const {
  createCharacter, getUsersCharacters,
  deleteCharacter,
  updateCharacter,
  getCharacter,
} = require('./controller/character.controller');
const {
  getAllUserMaps, createMap, getUserMap, deleteMap, updateMap,
} = require('./controller/map.controller');

router.post('/login', logIn);
router.post('/register', register);
router.get('/user', getUser);
router.get('/:username/maps/:mapId', getUserMap);
router.delete('/:username/maps/:mapId', deleteMap);
router.put('/:username/maps/:mapId', updateMap);
router.get('/:username/maps', getAllUserMaps);
router.post('/:username/map/new', createMap);

router.get('/:username/characters/:characterId', getCharacter);
router.delete('/:username/characters/:characterId', deleteCharacter);
router.put('/:username/characters/:characterId', updateCharacter);
router.get('/:username/characters/characters', getUsersCharacters);
router.post('/:username/character/new', createCharacter);

module.exports = router;
