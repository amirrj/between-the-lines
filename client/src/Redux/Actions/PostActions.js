import axios from 'axios';
import { tokenConfig } from './AuthActions';
import {
  GET_POSTS_BY_TOPICS,
  GET_POSTS_BY_USER,
  GET_POST,
  POSTS_LOADING,
  DELETE_POST,
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
    .get('/api/posts', tokenConfig(getState))
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
    .get(`/api/posts/user`, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: GET_POSTS_BY_USER, payload: res.data });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data));
    });
};

// get single post to display
export const getPost = (id) => (dispatch, getState) => {
  //clear all previous errors
  dispatch(clearErrors());

  // set posts loading to true
  dispatch({ type: POSTS_LOADING });

  //get post
  axios
    .get(`/api/posts/post/${id}`, tokenConfig(getState))
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
    .delete(`/api/posts/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: DELETE_POST, payload: res.data });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data));
    });
};
