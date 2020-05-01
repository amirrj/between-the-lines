import { GET_ERRORS, CLEAR_ERRORS } from '../Actions/types.js';

const initialState = {};

const ErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default ErrorReducer;