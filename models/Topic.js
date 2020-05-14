const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TopicSchema = new Schema({
  topic: {
    type: String,
    required: true,
  },
  users_following: {
    type: Array,
    default: [],
    required: true,
  },
  posts_related: {
    type: Array,
    default: [],
    required: true,
  },
});

module.exports = Topic = mongoose.model('topic', TopicSchema);
