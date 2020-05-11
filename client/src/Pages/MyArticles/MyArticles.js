import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsByUser, deletePost } from '../../Redux/Actions/PostActions';

import Navigation from '../../Components/Navigation/Navigation';
import PostCard from '../../Components/PostCard/PostCard';
import Loading from '../../Components/Helpers/Loading/Loading';
import Modal from '../../Components/Modal/Modal';

import './MyArticles.css';

const MyArticles = (props) => {
  const dispatch = useDispatch();
  const userLoading = useSelector((state) => state.auth.isLoading);
  const postsLoading = useSelector((state) => state.posts.postsLoading);
  const posts = useSelector((state) => state.posts.posts);

  const [isOpen, setIsOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState({});

  const openModalHandler = (post) => {
    setIsOpen(true);
    setPostToDelete(post);
  };

  const closeModalHandler = () => {
    setIsOpen(false);
  };

  const deletePostHander = (id) => {
    dispatch(deletePost(id));
    dispatch(getPostsByUser());
    setIsOpen(false);
  };

  useEffect(() => {
    dispatch(getPostsByUser());
  }, [dispatch]);

  const display =
    userLoading || postsLoading ? (
      <Loading />
    ) : (
      <React.Fragment>
        <Navigation />
        <div className="myArticles">
          <h1 className="myArticles__title">My Articles</h1>
          <Link className="myArticles__button">Write your own story</Link>
          {posts.length ? (
            <React.Fragment>
              <PostCard posts={posts} edit openModal={openModalHandler} />
              <Modal
                isOpen={isOpen}
                post={postToDelete}
                closeModal={closeModalHandler}
                deletePost={deletePostHander}
              />{' '}
            </React.Fragment>
          ) : (
            <p className="myArticles__text">No articles to display.</p>
          )}
        </div>
      </React.Fragment>
    );

  return display;
};

export default MyArticles;
