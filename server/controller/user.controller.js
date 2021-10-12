const User = require('../DB/models/user.model');

exports.createUser = async (req, res) => {
  try {
    const newUser = req.body;
    const userExist = await User.exists({ email: newUser.email });
    if (userExist) res.status(403).json({ error: 'User already exist' });
    await User.create(newUser);
    res.status(200).send({ message: 'new user created' });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};
