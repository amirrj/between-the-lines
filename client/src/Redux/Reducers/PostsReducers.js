import {
  GET_POSTS_BY_TOPICS,
  GET_POSTS_BY_USER,
  GET_ALL_POSTS,
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
    case GET_ALL_POSTS:
      return {
        ...state,
        posts: action.payload,
        postsLoading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload.post,
        postsLoading: false,
      };
    case CREATE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload.id),
      };
    default:
      return state;
  }
};

export default PostsReducer;
