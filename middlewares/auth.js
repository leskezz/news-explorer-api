const jwt = require('jsonwebtoken');
const WrongAuthError = require('../errors/wrong-auth-err');
const { jwtKey } = require('../utils/config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new WrongAuthError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, jwtKey);
  } catch (err) {
    throw new WrongAuthError('Необходима авторизация');
  }
  req.user = payload;
  return next();
};
