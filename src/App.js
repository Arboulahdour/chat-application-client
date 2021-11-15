import React from 'react';
import { Provider } from 'react-redux';
import Home from './containers/Home/Home';
import Room from './containers/Room/Room';
import store from './store';
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {

  return (
    <Router>
      <Provider store={store}>
        <Route path="/" exact component={Home} />
        <Route path="/room" exact component={Room} />
      </Provider>
    </Router>
  );
}

export default App;
