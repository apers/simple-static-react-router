import React from 'react';
import Router from './Router';
import Route from './Route';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router debug>
          <Route path="/about" />
          <Route path="/lol" />
        </Router>
      </div>
    );
  }
}

export default App;
