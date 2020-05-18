import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './Components/Helpers/PrivateRoute';

import { Provider } from 'react-redux';
import store from './Redux/store';
import { loadUser } from './Redux/Actions/AuthActions';

import Landing from './Pages/Landing/Landing';
import Auth from './Pages/Auth/Auth';
import Home from './Pages/Home/Home';
import Post from './Pages/Post/Post';
import MyArticles from './Pages/MyArticles/MyArticles';
import SearchArticles from './Pages/Search/Search';
import Topics from './Pages/Topics/Topics';
import CreateArticle from './Pages/CreateArticle/CreateArticle';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <div>
        <Router>
          <Switch>
            <Route path="/" component={Landing} exact />
            <Route path="/auth" component={Auth} exact />
            <Route path="/register" component={Auth} exact />
            <PrivateRoute path="/home" component={Home} exact />
            <PrivateRoute path="/post/:postid" component={Post} exact />
            <PrivateRoute path="/myarticles" component={MyArticles} exact />
            <PrivateRoute path="/search" component={SearchArticles} exact />
            <PrivateRoute path="/topics" component={Topics} exact />
            <PrivateRoute
              path="/createarticle"
              component={CreateArticle}
              exact
            />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
