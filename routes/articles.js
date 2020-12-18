const articlesRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { sendAllArticles, createArticle, deleteArticle } = require('../controllers/articles');

// eslint-disable-next-line no-useless-escape
const regLink = /^https?:\/\/(www\.)?[\w-._~:\/?#\[\]@!$&'()*+,;=]+(\.[a-z]+)[[\w-._~:\/?#\[\]@!$&'()%*+,;=]*#?$/;

articlesRouter.get('/', sendAllArticles);

articlesRouter.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2),
    title: Joi.string().required().min(2),
    text: Joi.string().required().min(2),
    date: Joi.date().required(),
    source: Joi.string().required().min(2),
    link: Joi.string().regex(regLink).required().min(2),
    image: Joi.string().regex(regLink).required().min(2),
  }),
}), createArticle);

articlesRouter.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24),
  }),
}), deleteArticle);

module.exports = articlesRouter;
