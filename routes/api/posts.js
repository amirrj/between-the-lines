const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const User = require('../../models/User');
const postsValidation = require('../../validation/posts');

// @route POST /api/posts
// @desc create a new post
// @access private
router.post('/', auth, async (req, res) => {
  const { errors, isValid } = postsValidation(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // find author
  const findAuthor = (id) => {
    return User.findById(id).exec();
  };

  const author = await findAuthor(req.user.id);

  if (!author) {
    return res
      .status(401)
      .json({ msg: 'Could not get user from token, Token may be invalid' });
  }

  // change topic to lowercase
  const topic = req.body.topic;
  const lowerCaseTopic = topic.toLowerCase();

  const newPost = new Post({
    title: req.body.title,
    description: req.body.description,
    article: req.body.article,
    image: req.body.image,
    image_caption: req.body.image_caption,
    topics: lowerCaseTopic,
    author: {
      user_id: author.id,
      firstName: author.firstName,
      lastName: author.lastName,
    },
  });

  await newPost
    .save()
    .then((post) => res.json(post))
    .catch((err) => console.log(err));
});

// @route DELETE /api/posts/:postid
// @desc delete a post
// @access private
router.delete('/:postid', auth, (req, res) => {
  const id = req.params.postid;

  Post.findByIdAndDelete(id, (err, post) => {
    if (err) throw err;
    res.json({ deleted: post });
  });
});

// @route GET /api/posts
// @desc get all posts from topics the user is following
// @access private
router.get('/', auth, async (req, res) => {
  // find user
  const findAuthor = (id) => {
    return User.findById(id).exec();
  };

  const author = await findAuthor(req.user.id);

  if (!author) {
    return res
      .status(401)
      .json({ msg: 'Could not get user from token, Token may be invalid' });
  }

  // list of topics user is following
  const userTopics = author.topics_following.map((topic) => {
    return topic.topic;
  });

  await Post.find({ topics: { $in: userTopics } })
    .sort({ post_date: -1 })
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) =>
      res.status(400).json({ msg: 'Something went wrong, please try again' })
    );
});

// @route GET /api/posts/user
// @desc get all posts from single user
// @access private
router.get('/user', auth, async (req, res) => {
  // find author
  const findAuthor = (id) => {
    return User.findById(id).exec();
  };

  const author = await findAuthor(req.user.id);

  if (!author) {
    return res
      .status(401)
      .json({ msg: 'Could not get user from token, Token may be invalid' });
  }

  Post.find({ 'author.user_id': author.id }).then((posts) => {
    res.json(posts);
  });
});

// @route GET /api/posts/post/:postid
// @desc get single post by id
// @access private
router.get('/post/:postid', auth, (req, res) => {
  const id = req.params.postid;

  Post.findById(id)
    .then((post) => {
      if (!post) {
        return res.status(404).json({ msg: 'No post found' });
      }

      res.json({ post });
    })
    .catch((err) =>
      res.status(400).json({ msg: 'Something went wrong, please try again' })
    );
});

module.exports = router;
