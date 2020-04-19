const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const mongoose = require('mongoose');

const validateRegister = require('../../validation/register');
const User = require('../../models/User');

// @route POST /api/users
// @desc register a new user
// @access public
router.post('/', (req, res) => {
  const { errors, isValid } = validateRegister(req.body);

  if (!isValid) {
    return res.status(401).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = 'User already exists';
      return res.status(400).json(errors);
    }

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          res.json({
            User: {
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              password: user.password,
              topics_following: user.topics_following,
              register_date: user.register_date,
            },
          });
        });
      });
    });
  });
});

// @route POST /api/users/topic
// @desc add a topic to user topics list
// @access private
router.post('/topic', auth, async (req, res) => {
  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({ msg: 'Topic is required' });
  }

  User.findById(req.user.id).then((user) => {
    if (!user) {
      res.status(400).json({ msg: 'No user found, token may be invalid' });
    }

    const newTopic = {
      topic,
    };

    try {
      user.topics_following.push(newTopic);
      user.save().then((user) => res.json({ user: user }));
    } catch (e) {
      return res.status(400).json({ msg: 'Could not follow topic' });
    }
  });
});

// @route DELETE /api/users/topic/:topicId
// @desc remove a topic from users topics
// @access private
router.delete('/topic/:topicId', auth, async (req, res) => {
  const id = req.params.topicId;

  if (!id) {
    return res.status(400).json({ msg: 'Please provide a topic id' });
  }

  User.findById(req.user.id).then(async (user) => {
    if (!user) {
      return res.status(400).json({
        msg: 'Could not find user, token may be invalid',
      });
    }

    try {
      user.topics_following = user.topics_following.filter(
        (topic) => topic.id !== id
      );
      await user.save().then((user) => res.json(user));
    } catch (e) {
      return res.status(400).json({ msg: 'Could not delete topic' });
    }
  });
});

module.exports = router;
