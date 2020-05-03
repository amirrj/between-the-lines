import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsByUser, deletePost } from '../../Redux/Actions/PostActions';

import LogoImage from '../../Assets/Between-the-lines-full-logo-2.png';
import PostCard from '../../Components/PostCard/PostCard';
import Loading from '../../Components/Helpers/Loading/Loading';
import Modal from '../../Components/Modal/Modal';

import './MyArticles.css';

const MyArticles = (props) => {
  const dispatch = useDispatch();
  const userLoading = useSelector((state) => state.auth.isLoading);
  const postsLoading = useSelector((state) => state.posts.postsLoading);

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
      <div className="myArticles">
        <img
          className="myArticles__logo"
          src={LogoImage}
          alt="between the lines logo"
        />
        <PostCard edit openModal={openModalHandler} />
        <Modal
          isOpen={isOpen}
          post={postToDelete}
          closeModal={closeModalHandler}
          deletePost={deletePostHander}
        />
      </div>
    );

  return display;
};

export default MyArticles;
