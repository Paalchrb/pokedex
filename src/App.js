import React from 'react';
import './App.css';
import { HashRouter, Route } from 'react-router-dom';

import Overview from './containers/Overview';

class App extends React.Component {
  render() {
    return (
      <div className="root">
        <HashRouter>
          <Route path="/" component={Overview} />
        </HashRouter>
      </div>
    );
  }
}

export default App;
