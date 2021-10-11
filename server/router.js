const router = require('express').Router();
const { createUser } = require('./controller/user.controller');

// router.get('/', (req, res) => {
//   res.status(200).send('all good routes initialized');
// });

router.post('/register', createUser);

module.exports = router;
