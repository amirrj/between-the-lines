import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getTopics,
  followTopic,
  unFollowTopic,
} from '../../Redux/Actions/TopicActions';

import Loading from '../../Components/Helpers/Loading/Loading';
import Navigation from '../../Components/Navigation/Navigation';
import TopicCard from '../../Components/TopicCard/TopicCard';
import './Topics.css';

const Topics = () => {
  const dispatch = useDispatch();
  const userLoading = useSelector((state) => state.auth.isLoading);
  const topicsLoading = useSelector((state) => state.topics.isLoading);
  const topics = useSelector((state) => state.topics.topics);
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    dispatch(getTopics());
  }, [dispatch]);

  const followTopicHandler = (id) => {
    dispatch(followTopic(id));
  };

  const unfollowTopicHandler = (id) => {
    dispatch(unFollowTopic(id));
  };

  const display =
    userLoading || topicsLoading ? (
      <Loading />
    ) : (
      <React.Fragment>
        <Navigation />
        <div className="topics">
          <h1 className="topics__title">Topics</h1>
          <p className="topics__text">
            Follow topics to see posts from other users
          </p>
          <TopicCard
            unFollowTopic={unfollowTopicHandler}
            followTopic={followTopicHandler}
            topics={topics}
            user={user}
          />
        </div>
      </React.Fragment>
    );

  return display;
};

export default Topics;
