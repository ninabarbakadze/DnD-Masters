const router = require('express').Router();
const { register, logIn, getUser } = require('./controller/user.controller');

router.post('/login', logIn);
router.post('/register', register);
router.get('/user', getUser);

module.exports = router;
