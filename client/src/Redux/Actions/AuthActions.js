import axios from 'axios';
import { returnErrors } from './ErrorActions';

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types';

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get(
      `${process.env.REACT_APP_BACKEND_URL}/api/auth/user`,
      tokenConfig(getState)
    )
    .then((res) => dispatch({ type: USER_LOADED, payload: res.data }))
    .catch((err) => {
      dispatch(returnErrors(err.response.data));
      dispatch({ type: AUTH_ERROR });
    });
};

// Authenticate user
export const authenticateUser = (user, history) => (dispatch) => {
  // USER LOADING
  dispatch({ type: USER_LOADING });

  // add headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // authenicate user
  axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/api/auth`, user, config)
    .then((res) => {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });

      history.push('/home');
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data));
      dispatch({ type: LOGIN_FAIL });
    });
};

// register user
export const registerUser = (user, history) => (dispatch) => {
  // USER LOADING
  dispatch({ type: USER_LOADING });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // register user
  axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/api/users`, user, config)
    .then((res) => {
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });

      history.push('/home');
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data));
      dispatch({ type: REGISTER_FAIL });
    });
};

// logout user
export const logoutUser = () => (dispatch) => {
  dispatch({ type: LOGOUT_SUCCESS });
};

// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from localStorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // if token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
