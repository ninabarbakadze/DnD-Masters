const User = require('../DB/models/user.model');

exports.createUser = async (req, res) => {
  try {
    const { userName } = await req.body;
    const userExist = await User.exists({ userName });
    if (userExist) {
      throw new Error('User already exist');
    } else {
      await User.create(req.body);
      res.status(200).send({ message: 'new user created' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
