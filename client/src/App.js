import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './Redux/store';
import { loadUser } from './Redux/Actions/AuthActions';

import Landing from './Pages/Landing/Landing';
import Auth from './Pages/Auth/Auth';

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
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
