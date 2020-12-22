const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-error');
const DatabaseError = require('../errors/database-error');
const { jwtKey } = require('../utils/config');

const createUser = (req, res, next) => {
  const { name, email } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      const password = hash;
      User.create({
        name, email, password,
      })
        .then((user) => {
          if (!user) {
            return new ValidationError('Переданы невалидные данные в методы создания пользователя');
          }
          return res.send({ data: { _id: user._id, email: user.email, name: user.name } });
        })
        .catch((err) => {
          if (err.code === 11000) {
            throw new DatabaseError('Данный пользователь уже зарегистрирован');
          }
          return err;
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
        jwtKey,
        { expiresIn: '7d' },
      );
      return res.send({ token });
    })
    .catch(next);
};

const sendCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Not Found'))
    .then((user) => res.send({ data: { email: user.email, name: user.name } }))
    .catch(next);
};

module.exports = {
  createUser,
  login,
  sendCurrentUser,
};
