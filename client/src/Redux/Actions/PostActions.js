import axios from 'axios';
import { tokenConfig } from './AuthActions';
import {
  GET_POSTS_BY_TOPICS,
  GET_POSTS_BY_USER,
  GET_POST,
  POSTS_LOADING,
  DELETE_POST,
  CREATE_POST,
  GET_ALL_POSTS,
} from './types';
import { returnErrors, clearErrors } from './ErrorActions';

// Get posts by topic
export const getPostsByTopics = () => (dispatch, getState) => {
  // clear all errors
  dispatch(clearErrors());

  // set posts loading
  dispatch({ type: POSTS_LOADING });

  // get posts by topic
  axios
    .get(
      `${process.env.REACT_APP_BACKEND_URL}/api/posts`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({ type: GET_POSTS_BY_TOPICS, payload: res.data });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data));
    });
};

// Get all posts by user
export const getPostsByUser = (id) => (dispatch, getState) => {
  // clear all previous errors
  dispatch(clearErrors());

  // set posts loading to true
  dispatch({ type: POSTS_LOADING });

  axios
    .get(
      `${process.env.REACT_APP_BACKEND_URL}/api/posts/user`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({ type: GET_POSTS_BY_USER, payload: res.data });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data));
    });
};

// get all posts
export const getAllPosts = () => (dispatch, getState) => {
  // clear errors
  dispatch(clearErrors());

  // set postsloading to true
  dispatch({ type: POSTS_LOADING });

  // get all posts
  axios
    .get(
      `${process.env.REACT_APP_BACKEND_URL}/api/posts/all`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({ type: GET_ALL_POSTS, payload: res.data });
    })
    .catch((err) => dispatch(returnErrors(err.response.data)));
};

// get single post to display
export const getPost = (id) => (dispatch, getState) => {
  //clear all previous errors
  dispatch(clearErrors());

  // set posts loading to true
  dispatch({ type: POSTS_LOADING });

  //get post
  axios
    .get(
      `${process.env.REACT_APP_BACKEND_URL}/api/posts/post/${id}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({ type: GET_POST, payload: res.data });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data));
    });
};

// delete post
export const deletePost = (id) => (dispatch, getState) => {
  // clear all errors
  dispatch(clearErrors());

  // delete post
  axios
    .delete(
      `${process.env.REACT_APP_BACKEND_URL}/api/posts/${id}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({ type: DELETE_POST, payload: res.data });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data));
    });
};

// create new post
export const createPost = (postData, history) => (dispatch, getState) => {
  //clear errors
  dispatch(clearErrors());

  //create new post
  axios
    .post(
      `${process.env.REACT_APP_BACKEND_URL}/api/posts`,
      postData,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({ type: CREATE_POST, payload: res.data });
      history.push('/myarticles');
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data));
    });
};
