const routes = require('express').Router();

const signinRouter = require('./signin.js');
const signupRouter = require('./signup.js');
const articlesRouter = require('./articles.js');
const usersRouter = require('./users.js');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');

routes.use('/signin', signinRouter);
routes.use('/signup', signupRouter);

routes.use(auth);

routes.use('/articles', articlesRouter);
routes.use('/users', usersRouter);

routes.use(() => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = routes;
