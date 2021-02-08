const signupRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser } = require('../controllers/users');

signupRouter.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required().min(4)
      .max(40),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

module.exports = signupRouter;
