import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPostsByTopics } from '../../Redux/Actions/PostActions';

import Loading from '../../Components/Helpers/Loading/Loading';
import PostCard from '../../Components/PostCard/PostCard';
import LogoImage from '../../Assets/Between-the-lines-full-logo-2.png';

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
      <div className="home">
        <img
          className="home__logo"
          src={LogoImage}
          alt="between the lines logo"
        />
        <h1 className="home__title">Recent Articles</h1>
        {posts.length ? (
          <PostCard />
        ) : (
          <p className="home__text">
            No posts to display. To see posts please head over to topics and
            find some of your favourite interests.
          </p>
        )}
      </div>
    );

  return display;
};

export default Home;
