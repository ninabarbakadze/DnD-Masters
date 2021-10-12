const router = require('express').Router();
const { register, logIn } = require('./controller/user.controller');

router.post('/login', logIn);
router.post('/register', register);
// router.get('/user', findUser);

module.exports = router;
