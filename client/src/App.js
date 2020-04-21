import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Landing from './Pages/Landing/Landing';
import Auth from './Pages/Auth/Auth';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" component={Landing} exact />
          <Route path="/auth" component={Auth} exact />
          <Route path="/register" component={Auth} exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
