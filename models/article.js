const mongoose = require('mongoose');
// eslint-disable-next-line no-useless-escape
const regex = /^https?:\/\/(www\.)?[\w-._~:\/?#\[\]@!$&'()*+,;=]+(\.[a-z]+)[[\w-._~:\/?#\[\]@!$&'()%*+,;=]*#?$/;

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
    minlength: 2,
  },
  title: {
    type: String,
    required: true,
    minlength: 2,
  },
  text: {
    type: String,
    required: true,
    minlength: 2,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  source: {
    type: String,
    required: true,
    minlength: 2,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return regex.test(v);
      },
      message: 'Некорректная ссылка на статью',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return regex.test(v);
      },
      message: 'Некорректная ссылка на иллюстрацию к статье',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

module.exports = mongoose.model('article', articleSchema);
