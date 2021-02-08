const Article = require('../models/article.js');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-error');
const ForbiddenError = require('../errors/forbidden');

const sendAllArticles = (req, res, next) => {
  Article.find({})
    .orFail(new NotFoundError('Статьи не найдены'))
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

const createArticle = (req, res, next) => {
  const owner = req.user._id;
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => {
      if (!article) {
        throw new ValidationError('Введены некорректные данные');
      }
      res.send({
        data: {
          _id: article._id, keyword, title, text, date, source, link, image,
        },
      });
    })
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .orFail(new NotFoundError('Статья с данным id не найдена'))
    .populate('owner')
    .then((article) => {
      if (article.owner._id.toString() !== req.user._id) {
        throw new ForbiddenError('Невозможно удалить чужую статью');
      }
      return Article.findByIdAndRemove(article._id)
        .then((deletedArticle) => res.send({ data: deletedArticle }))
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  sendAllArticles,
  createArticle,
  deleteArticle,
};
