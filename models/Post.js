const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  article: {
    type: Array,
    required: true,
  },
  image: {
    type: String,
  },
  image_caption: {
    type: String,
  },
  post_date: {
    type: Date,
    default: Date.now,
  },
  topic: {
    type: String,
    required: true,
  },
  author: {
    type: Object,
    required: true,
  },
});

module.exports = Posts = mongoose.model('post', PostSchema);
