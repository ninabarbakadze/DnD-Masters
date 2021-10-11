const User = require('../DB/models/user.model');

exports.createUser = async (req, res) => {
  try {
    const newUser = await req.body;
    const userExist = await User.exists({ userName: newUser.userName });
    if (userExist) throw new Error('User already exist');
    await User.create(newUser);
    res.status(200).send({ message: 'new user created' });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
