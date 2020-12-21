const articlesRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { sendAllArticles, createArticle, deleteArticle } = require('../controllers/articles');

articlesRouter.get('/', sendAllArticles);

articlesRouter.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2),
    title: Joi.string().required().min(2),
    text: Joi.string().required().min(2),
    date: Joi.date().required(),
    source: Joi.string().required().min(2),
    link: Joi.string().required().min(2).custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле ссылки на статью заполнено некорректно');
    }),
    image: Joi.string().required().min(2).custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле ссылки на изображение в статье заполнено некорректно');
    }),
  }),
}), createArticle);

articlesRouter.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24),
  }),
}), deleteArticle);

module.exports = articlesRouter;
