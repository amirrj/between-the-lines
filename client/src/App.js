import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import Store from './Redux/store';

import Landing from './Pages/Landing/Landing';
import Auth from './Pages/Auth/Auth';

function App() {
  return (
    <Provider store={Store}>
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
