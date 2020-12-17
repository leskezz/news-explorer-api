const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-error');

const sendAllUsers = (req, res, next) => {
  User.find({})
    .orFail(new NotFoundError('Пользователи не найдены'))
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const sendUser = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(new NotFoundError('Пользователь с данным id не найден'))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

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

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .orFail(new NotFoundError('Пользователь с таким id не найдены'))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .orFail(new NotFoundError('Пользователь с таким id не найдены'))
    .then((user) => res.send({ data: user }))
    .catch(next);
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
  sendAllUsers,
  sendUser,
  createUser,
  updateUser,
  updateAvatar,
  login,
  sendCurrentUser,
};
