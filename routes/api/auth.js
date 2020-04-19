const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');

const authValidation = require('../../validation/auth');
const User = require('../../models/User');

// @route POST /api/auth
// @desc checks to see if user has authorisation
// @access public
router.post('/', (req, res) => {
  const { errors, isValid } = authValidation(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      errors.email = 'User does not exist';
      return res.status(401).json(errors);
    }

    bcrypt.compare(req.body.password, user.password).then((isMatch) => {
      if (!isMatch) {
        errors.password = 'Password is incorrect';
        return res.status(400).json(errors);
      }

      jwt.sign(
        { id: user.id },
        config.get('jwt_secret'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            user: user,
            token,
          });
        }
      );
    });
  });
});

// @route GET /api/auth/user
// @desc get user from token
// @access private
router.get('/user', auth, (req, res) => {
  const userid = req.user.id;

  User.findById(userid)
    .select('-password')
    .then((user) => res.json(user));
});

module.exports = router;
