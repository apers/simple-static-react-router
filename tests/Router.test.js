import React from "react";
import ReactDOM from "react-dom";
import expect from "expect";
import expectJSX from "expect-jsx";
import ReactTestUtils from "react-dom/test-utils";
import Router from '../src/Router';
import Route from '../src/Route';
import A from "./TestComponents/A";
import ReactDOMServer from 'react-dom/server';
import B from "./TestComponents/B";

expect.extend(expectJSX);

let render = ReactDOMServer.renderToStaticMarkup;

it("Renders empty when no route matches", () => {
  window.location.hash = "#";
  expect(render(
      <div className="App">
        <Router><Route path="/a/:user?/:user2?"><A/></Route><Route path="/b/:user?"><B/></Route></Router>
      </div>
  )).toEqual(render(
      <div className="App">
        <div></div>
      </div>
  ));
});

it("Renders empty when no route matches", () => {
  window.location.hash = "#/b/username";
  expect(render(
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
  )).toEqualJSX(render(
      <div className="App">
        <div>
          <div>
            <B/>
          </div>
        </div>
      </div>
  ));
});

