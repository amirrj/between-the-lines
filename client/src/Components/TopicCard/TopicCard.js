import React from 'react';

import './TopicCard.css';

const TopicCard = (props) => {
  const display = props.topics.map((topic) => {
    if (topic.users_following.includes(props.user._id)) {
      return (
        <div
          onClick={() => props.unFollowTopic(topic._id)}
          key={topic._id}
          className="topicCard topicCard--following"
        >
          <h1 className="topicCard__title">{topic.topic}</h1>
          <p className="topicCard__following">
            {topic.users_following.length} following this topic
          </p>
          <p className="topicCard__posts">
            {topic.posts_related.length} articles for this topic
          </p>
        </div>
      );
    } else {
      return (
        <div
          onClick={() => props.followTopic(topic._id)}
          key={topic._id}
          className="topicCard"
        >
          <h1 className="topicCard__title">{topic.topic}</h1>
          <p className="topicCard__following">
            {topic.users_following.length} following this topic
          </p>
          <p className="topicCard__posts">
            {topic.posts_related.length} articles for this topic
          </p>
        </div>
      );
    }
  });

  return display;
};

export default TopicCard;
