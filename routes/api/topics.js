const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Topic = require('../../models/Topic');

// @ROUTE POST /api/topic
// @DESC add a new topic into database
// @access private
router.post('/', auth, (req, res) => {
  const { topic } = req.body;
  const lowerCaseTopic = topic.toLowerCase();

  const newTopic = new Topic({
    topic: lowerCaseTopic,
  });

  newTopic
    .save()
    .then((topic) => res.json(topic))
    .catch((err) =>
      res
        .status(400)
        .json({ msg: 'Something went wrong, please try again later' })
    );
});

// @ROUTE DELETE /api/topic/:id
// @DESC delete a topic from the database
// @access private
router.delete('/:topicId', auth, (req, res) => {
  const id = req.params.topicId;

  Topic.findByIdAndDelete(id)
    .then((topic) => res.json(topic))
    .catch((err) => res.status(400).json({ msg: 'Something went Wrong' }));
});

// @ROUTE GET /api/topic
// @DESC get all topics from database
// @access private
router.get('/', auth, (req, res) => {
  Topic.find()
    .sort({ topic: 1 })
    .then((topics) => res.json(topics))
    .catch((err) =>
      res
        .status(400)
        .json({ msg: 'Something went wrong please try again later' })
    );
});

module.exports = router;
