module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).json({ err: message || 'На сервере произошла ошибка' });
  next(); // никуда не ведёт, добавлен, чтобы не ругался линтер
};
