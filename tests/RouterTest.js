import React from 'react';
import Router from '../src/Router';
import Route from '../src/Route';
import A from "./TestComponents/A";
import B from "./TestComponents/B";

class RouterTest extends React.Component {
  render() {
    return (
        <div className="App">
          <Router>
            <Route path="/a/:user?/:user2?">
              <A/>
            </Route>
            <Route path="/b/:user?">
              <B/>
            </Route>
          </Router>
        </div>
    );
  }
}

export default RouterTest;
