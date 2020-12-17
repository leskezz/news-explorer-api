const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-error');

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      const password = hash;
      User.create({
        name, about, avatar, email, password,
      })
        .then((user) => {
          if (!user) {
            return new ValidationError('Переданы невалидные данные в методы создания пользователя');
          }
          return res.send({ data: user });
        })
        .catch(next);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        '01bd5003e8f4ed785eea80483d73e553344b65b3fd2ad2bc44bbda20cfe83e7f',
        { expiresIn: '7d' },
      );
      return res.send({ token });
    })
    .catch(next);
};

const sendCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Not Found'))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports = {
  createUser,
  login,
  sendCurrentUser,
};
