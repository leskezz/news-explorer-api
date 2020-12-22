require('dotenv').config();

const {
  PORT = 3000, NODE_ENV, MONGO_URL, JWT_SECRET,
} = process.env;

const devMongoURL = 'mongodb://localhost:27017/newsdb';
const devJWTKey = 'dev-secret';

const mongoURL = NODE_ENV === 'production' ? MONGO_URL : devMongoURL;
const jwtKey = NODE_ENV === 'production' ? JWT_SECRET : devJWTKey;

module.exports = {
  PORT,
  mongoURL,
  jwtKey,
};
