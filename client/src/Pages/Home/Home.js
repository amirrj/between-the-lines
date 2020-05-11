import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPostsByTopics } from '../../Redux/Actions/PostActions';

import Navigation from '../../Components/Navigation/Navigation';
import Loading from '../../Components/Helpers/Loading/Loading';
import PostCard from '../../Components/PostCard/PostCard';

import './Home.css';

const Home = (props) => {
  const dispatch = useDispatch();
  const userLoading = useSelector((state) => state.auth.isLoading);
  const postsLoading = useSelector((state) => state.posts.postsLoading);
  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    dispatch(getPostsByTopics());
  }, [dispatch]);

  const display =
    userLoading || postsLoading ? (
      <Loading />
    ) : (
      <React.Fragment>
        <Navigation />
        <div className="home">
          <h1 className="home__title">Recent Articles</h1>
          {posts.length ? (
            <PostCard posts={posts} />
          ) : (
            <p className="home__text">
              No articles to display. To see articles please head over to topics
              and find some of your favourite interests.
            </p>
          )}
        </div>
      </React.Fragment>
    );

  return display;
};

export default Home;
