import React from 'react';
import Router from './Router';
import Route from './Route';
import A from "./TestComponents/A";
import B from "./TestComponents/B";
import './App.css';

class App extends React.Component {
  render() {
    return (
        <div className="App">
          <Router debug>
            <Route path="/a/:user?/:user2?">
              <A/>
            </Route>
            <Route path="/b">
              <B/>
            </Route>
          </Router>
        </div>
    );
  }
}

export default App;
