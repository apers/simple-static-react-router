import React from "react";
import ReactDOM from "react-dom";
import expect from "expect";
import expectJSX from "expect-jsx";
import RouterTest from "./RouterTest";
import A from "./TestComponents/A";
import B from "./TestComponents/B";

expect.extend(expectJSX);

it('renders without crashing', () => {
  const div = document.createElement('div');
  window.location.hash = "#/b/username";
  expect(<RouterTest />).toEqualJSX(
      <div className="App">
        <div>
          <div>
            <B/>
          </div>
        </div>
      </div>
      );
});

