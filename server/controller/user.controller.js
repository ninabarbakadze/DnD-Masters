const User = require('../DB/models/user.model');

exports.createUser = async (req, res) => {
  try {
    const { userName } = req.body;
    console.log(userName);

    const userExist = await User.find({ userName });
    console.log(userExist);
    if (userExist) throw new Error('User already exist');
    // await User.create(newUser);
    res.status(200).send({ message: 'new user created' });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
