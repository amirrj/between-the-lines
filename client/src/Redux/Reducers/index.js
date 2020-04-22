import { combineReducers } from 'redux';
import PostsReducer from './PostsReducers';
import AuthReducer from './AuthReducer';
import ErrorReducer from './ErrorReducer';

const rootReducer = combineReducers({
  posts: PostsReducer,
  auth: AuthReducer,
  error: ErrorReducer,
});

export default rootReducer;
