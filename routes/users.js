const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  sendAllUsers, sendUser, updateUser, updateAvatar, sendCurrentUser,
} = require('../controllers/users');

usersRouter.get('/', sendAllUsers);

usersRouter.get('/me', sendCurrentUser);

usersRouter.get('/:id', sendUser);

usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2),
  }),
}), updateUser);

usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().min(2),
  }),
}), updateAvatar);

module.exports = usersRouter;
