const articlesRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { sendAllCards, createCard, deleteCard } = require('../controllers/articles');

articlesRouter.get('/', sendAllCards);

articlesRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    link: Joi.string().regex(/^https?:\/\/(www\.)?[\w-._~:\/?#\[\]@!$&'()*+,;=]+(\.[a-z]+)[[\w-._~:\/?#\[\]@!$&'()%*+,;=]*#?$/).required().min(2),
  }),
}), createCard);

articlesRouter.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), deleteCard);

module.exports = articlesRouter;
