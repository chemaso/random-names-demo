import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import UsersPage from "containers/UsersPage";

// create a basic implementation of routing
const RoutesGenerator = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={UsersPage} />
      </Switch>
    </Router>
  );
};

export default RoutesGenerator;
