const usersRouter = require('express').Router();
const { sendCurrentUser } = require('../controllers/users');

usersRouter.get('/me', sendCurrentUser);

module.exports = usersRouter;
