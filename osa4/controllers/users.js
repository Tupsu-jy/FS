const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body;

  if (password === undefined || password.length < 3) {
    next(new Error('password invalid'));
    return;
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });
  try {
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (exception) {
    next(exception);
  }
});

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs');
  response.status(201).json(users);
});

module.exports = usersRouter;
