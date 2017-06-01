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
        <Router>
          <Route path="/a/:user?/:user2?">
            <A/>
          </Route>
          <Route path="/b/:user?">
            <B/>
          </Route>
        </Router>
      </div>
  )).toEqual(render(
      <div className="App">
        <div></div>
      </div>
  ));
});

it("Works with single route", () => {
  window.location.hash = "#/username";
  expect(render(
      <div className="App">
        <Router>
          <Route path="/:user?">
            <B/>
          </Route>
        </Router>
      </div>
  )).toEqualJSX(render(
      <div className="App">
        <div>
          <div>
            <div className="B">
              username
            </div>
          </div>
        </div>
      </div>
  ));
});

it("Renders single route with param", () => {
  window.location.hash = "#/username";
  expect(render(
      <div className="App">
        <Router>
          <Route path="/:user?">
            <B/>
          </Route>
          <Route path="/:user?/:user2?">
            <A/>
          </Route>
        </Router>
      </div>
  )).toEqualJSX(render(
      <div className="App">
        <div>
          <div>
            <div className="B">
              username
            </div>
          </div>
        </div>
      </div>
  ));
});

it("Renders single route with double param", () => {
  window.location.hash = "#/foo/bar";
  expect(render(
      <div className="App">
        <Router debug={true}>
          <Route path="/:user">
            <B/>
          </Route>
          <Route path="/:user/:user2">
            <A/>
          </Route>
        </Router>
      </div>
  )).toEqualJSX(render(
      <div className="App">
        <div>
          <div>
            <A/>
          </div>
        </div>
      </div>
  ));
});