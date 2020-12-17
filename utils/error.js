const sendError = (err) => {
  if (err.name === 'ValidationError') return 'Переданы некорректные данные в методы создания пользователя, обновления аватара пользователя или профиля';
  if (err.name === 'CastError') return 'Указан невалидный id карточки или пользователя';
  if (err.name === 'No permission') return 'Карточка создана другим пользователем';
  if (err.name === 'MongoError') return 'Данный пользователь уже зарегистрирован';
  return 'На сервере произошла ошибка';
};

const sendErrorStatus = (err) => {
  if (err.name === 'ValidationError') return 400;
  if (err.name === 'CastError') return 400;
  if (err.name === 'No permission') return 400;
  if (err.name === 'MongoError') return 409;
  return 500;
};

module.exports = { sendError, sendErrorStatus };
