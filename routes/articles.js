const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  sendAllCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/articles');

cardsRouter.get('/', sendAllCards);
cardsRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    link: Joi.string().regex(/^https?:\/\/(www\.)?[\w-._~:\/?#\[\]@!$&'()*+,;=]+(\.[a-z]+)[[\w-._~:\/?#\[\]@!$&'()%*+,;=]*#?$/).required().min(2),
  }),
}), createCard);
cardsRouter.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), deleteCard);
cardsRouter.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), likeCard);
cardsRouter.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), dislikeCard);

module.exports = cardsRouter;
