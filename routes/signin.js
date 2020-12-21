const signinRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login } = require('../controllers/users');

signinRouter.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required().min(4)
      .max(40),
    password: Joi.string().required().min(8),
  }),
}), login);

module.exports = signinRouter;
