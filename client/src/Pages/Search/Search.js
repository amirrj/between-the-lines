import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts } from '../../Redux/Actions/PostActions';

import LogoImage from '../../Assets/Between-the-lines-full-logo-2.png';
import Loading from '../../Components/Helpers/Loading/Loading';
import PostCard from '../../Components/PostCard/PostCard';
import './Search.css';

const Search = (props) => {
  const userLoading = useSelector((state) => state.auth.isLoading);
  const postsLoading = useSelector((state) => state.posts.postsLoading);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const [input, setInput] = useState('');

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const onChangeHandler = (e) => {
    setInput(e.target.value);
  };

  const displayPosts = posts.filter((p) =>
    p.title.includes(input.toLowerCase())
  );

  const display =
    userLoading || postsLoading ? (
      <Loading />
    ) : (
      <div className="search">
        <img
          className="search__logo"
          src={LogoImage}
          alt="between the lines logo"
        />
        <h1 className="search__title">Search Articles</h1>
        <input
          className="search__input"
          type="text"
          onChange={onChangeHandler}
          value={input}
          placeholder="Search by title"
        />
        <PostCard posts={displayPosts} />
      </div>
    );

  return display;
};

export default Search;
