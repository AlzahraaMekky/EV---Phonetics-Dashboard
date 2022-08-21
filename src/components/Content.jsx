import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import PhoneticsList from "./PhoneticsList";
import ExampleOfPhonetic from "./ExampleOfPhonetic";
function Content() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/">
            <PhoneticsList />
          </Route>
          <Route exact path="/examples/:name">
            <ExampleOfPhonetic />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
export default Content;
