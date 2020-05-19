import axios from 'axios';
import { tokenConfig } from './AuthActions';
import { GET_TOPICS, TOPICS_LOADING } from './types';
import { loadUser } from './AuthActions';
import { returnErrors, clearErrors } from './ErrorActions';

export const getTopics = () => (dispatch, getState) => {
  //clear errrors
  dispatch(clearErrors());

  //set topics loading to true
  dispatch({ type: TOPICS_LOADING });

  //get topics
  axios
    .get(
      `${process.env.REACT_APP_BACKEND_URL}/api/topics`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({ type: GET_TOPICS, payload: res.data });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data));
    });
};

export const followTopic = (id) => (dispatch, getState) => {
  dispatch(clearErrors());

  axios
    .post(
      `${process.env.REACT_APP_BACKEND_URL}/api/users/topic/${id}`,
      {},
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch(getTopics());
      dispatch(loadUser());
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data));
    });
};

export const unFollowTopic = (id) => (dispatch, getState) => {
  dispatch(clearErrors());

  axios
    .delete(
      `${process.env.REACT_APP_BACKEND_URL}/api/users/topic/${id}`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch(getTopics());
      dispatch(loadUser());
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data));
    });
};
