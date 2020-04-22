import {
  GET_POSTS_BY_TOPICS,
  GET_POSTS_BY_USER,
  CREATE_POST,
  DELETE_POST,
} from '../Actions/types';

const initialState = {
  displayPosts: [],
  usersPosts: [],
  Post: {},
};

const PostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_BY_TOPICS:
      return { ...state };
    case GET_POSTS_BY_USER:
      return { ...state };
    case CREATE_POST:
      return { ...state };
    case DELETE_POST:
      return { ...state };
    default:
      return state;
  }
};

export default PostsReducer;
