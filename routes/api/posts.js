const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const User = require('../../models/User');
const Topic = require('../../models/Topic');
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

  // provide image when user has not provided one
  const image = req.body.image
    ? req.body.image
    : `https://source.unsplash.com/daily?${topic}`;
  const imageCaption = req.body.image
    ? req.body.image__caption
    : 'Random image provided from Unsplash.com';

  // change title to lowercase
  const title = req.body.title;
  const lowerCaseTitle = title.toLowerCase();

  const article = req.body.article;
  const displayArticle = article.split('\n');

  const newPost = new Post({
    title: lowerCaseTitle,
    description: req.body.description,
    article: displayArticle,
    image: image,
    image_caption: imageCaption,
    topic: lowerCaseTopic,
    author: {
      user_id: author.id,
      firstName: author.firstName,
      lastName: author.lastName,
    },
  });

  await newPost
    .save()
    .then((post) => {
      Topic.findOne({ topic: topic }).then((topic) => {
        try {
          topic.posts_related.push(post.id);
          topic.save().then((topic) => res.json(post));
        } catch (e) {
          return res.json({ msg: 'could not add post to topics post list' });
        }
      });
    })
    .catch((err) => console.log(err));
});

// @route DELETE /api/posts/:postid
// @desc delete a post
// @access private
router.delete('/:postid', auth, (req, res) => {
  const id = req.params.postid;

  Post.findByIdAndDelete(id, (err, post) => {
    if (err) throw err;
    Topic.findOne({ topic: post.topic }).then((topic) => {
      try {
        topic.posts_related = topic.posts_related.filter(
          (postid) => postid !== post.id
        );
        topic.save().then((topic) => res.json(post));
      } catch (e) {
        return res
          .status(400)
          .json({ msg: 'Could not remove post from topic post list' });
      }
    });
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

  await Post.find({ topic: { $in: userTopics } })
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

  Post.find({ 'author.user_id': author.id })
    .sort({ post_date: -1 })
    .then((posts) => {
      res.json(posts);
    });
});

//  @route GET /api/posts/all
// @desc get all posts
// @access private
router.get('/all', auth, async (req, res) => {
  Post.find()
    .sort({ post_date: -1 })
    .then((posts) => {
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
      res.status(400).json({ msg: 'Could not get post, please try again' })
    );
});

module.exports = router;
