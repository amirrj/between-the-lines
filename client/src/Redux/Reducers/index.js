import { combineReducers } from 'redux';
import PostsReducer from './PostsReducers';
import TopicsReducer from './TopicsReducer';
import AuthReducer from './AuthReducer';
import ErrorReducer from './ErrorReducer';

const rootReducer = combineReducers({
  posts: PostsReducer,
  topics: TopicsReducer,
  auth: AuthReducer,
  error: ErrorReducer,
});

export default rootReducer;
