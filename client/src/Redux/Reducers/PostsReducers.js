import {
  GET_POSTS_BY_TOPICS,
  GET_POSTS_BY_USER,
  GET_POST,
  CREATE_POST,
  DELETE_POST,
  POSTS_LOADING,
} from '../Actions/types';

const initialState = {
  posts: [],
  post: {},
  postsLoading: null,
};

const PostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTS_LOADING:
      return {
        ...state,
        postsLoading: true,
      };
    case GET_POSTS_BY_TOPICS:
      return {
        ...state,
        posts: action.payload,
        postsLoading: false,
      };
    case GET_POSTS_BY_USER:
      return {
        ...state,
        posts: action.payload,
        postsLoading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
      };
    case CREATE_POST:
      return {
        ...state,
        usersPosts: [action.payload, ...state.usersPosts],
      };
    case DELETE_POST:
      return {
        ...state,
        usersPosts: state.usersPosts.filter(
          (post) => post.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export default PostsReducer;
