const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const validateRegister = require('../../validation/register');
const User = require('../../models/User');
const Topic = require('../../models/Topic');

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
          jwt.sign(
            { id: user.id },
            config.get('jwt_secret'),
            {
              expiresIn: 3600,
            },
            (err, token) => {
              res.json({
                token,
                User: {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                  password: user.password,
                  topics_following: user.topics_following,
                  register_date: user.register_date,
                },
              });
            }
          );
        });
      });
    });
  });
});

// @route POST /api/users/topic/:topicId
// @desc add a topic to user topics list
// @access private
router.post('/topic/:topicId', auth, async (req, res) => {
  const id = req.params.topicId;

  await Topic.findById(id).then((topic) => {
    User.findById(req.user.id).then((user) => {
      if (!user) {
        res.status(400).json({ msg: 'No user found, token may be invalid' });
      }

      const newTopic = {
        topicId: topic.id,
        topic: topic.topic,
      };

      try {
        user.topics_following.push(newTopic);
        topic.users_following.push(user.id);
        topic.save().then((topic) => {
          user.save().then((user) => res.json({ user: user, topic: topic }));
        });
      } catch (e) {
        return res.status(400).json({ msg: 'Could not follow topic' });
      }
    });
  });
});

// @route DELETE /api/users/topic/:topicId
// @desc remove a topic from users topics
// @access private
router.delete('/topic/:topicId', auth, async (req, res) => {
  const id = req.params.topicId;

  await Topic.findById(id)
    .then((topic) => {
      User.findById(req.user.id)
        .then((user) => {
          try {
            // remove user from topic user following list
            topic.users_following = topic.users_following.filter(
              (topicUser) => user.id !== topicUser
            );

            // remove topic from users topic list
            user.topics_following = user.topics_following.filter(
              (userTopic) => topic.id !== userTopic.topicId
            );

            topic
              .save()
              .then((topic) => {
                user
                  .save()
                  .then((user) => res.json({ user, topic }))
                  .catch((err) => {
                    return res.status(400).json({ msg: 'Could not save user' });
                  });
              })
              .catch((err) => {
                return res.status(400).json({ msg: 'could not save topic' });
              });
          } catch (err) {
            return res.status(400).json({ msg: 'Could not remove topic' });
          }
        })
        .catch((err) => {
          return res.status(400).json({ msg: 'unable to find user' });
        });
    })
    .catch((err) => {
      return res.status(400).json({ msg: 'unable to find topic', error: err });
    });
});

module.exports = router;
