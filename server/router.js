const router = require('express').Router();
const { register, logIn, getUser } = require('./controller/user.controller');
// eslint-disable-next-line
const { getAllUserMaps, createMap, getUserMap, deleteMap, updateMap } = require('./controller/map.controller');

router.post('/login', logIn);
router.post('/register', register);
router.get('/user', getUser);
router.get('/:username/maps/:mapId', getUserMap);
router.delete('/:username/maps/:mapId', deleteMap);
router.put('/:username/maps/:mapId', updateMap);
router.get('/:username/maps', getAllUserMaps);
router.post('/:username/map/new', createMap);

module.exports = router;
