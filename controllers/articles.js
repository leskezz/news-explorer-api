const Card = require('../models/article.js');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-error');

const sendAllCards = (req, res, next) => {
  Card.find({})
    .orFail(new NotFoundError('Карточки не найдены'))
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => {
      if (!card) {
        throw new ValidationError('Введены некорректные данные');
      }
      res.send({ data: card });
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFoundError('Карточка с данным id не найдена'))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        return Promise.reject(new Error('Карточка не может быть удалена данным пользователем'));
      }
      return Card.findByIdAndRemove(card._id)
        .then((deletedCard) => res.send({ data: deletedCard }))
        .catch(next);
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(new NotFoundError('Карточка с данным id не найдена'))
    .populate('likes')
    .then((card) => res.send({ data: card }))
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(new NotFoundError('Карточка с данным id не найдена'))
    .populate('likes')
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports = {
  sendAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
