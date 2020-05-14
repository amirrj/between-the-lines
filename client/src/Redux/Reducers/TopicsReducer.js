import { GET_TOPICS, TOPICS_LOADING } from '../Actions/types';

const initialState = {
  topics: [],
  isLoading: null,
};

const TopicsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOPICS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_TOPICS:
      return {
        ...state,
        topics: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default TopicsReducer;
