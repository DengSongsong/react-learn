import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
// https://github.com/jamiebuilds/react-loadable
const MyLoadingComponent = ({ isLoading, error }) => {
  if (isLoading) {
    return MyLoadingComponent;
  } else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>;
  } else {
    return null;
  }
};
const asyncLoader = c => {
  return Loadable({
    loader: c,
    loading() {
      return MyLoadingComponent;
    }
  });
};
const NoMatch = () => {
  return <div>404</div>;
};

export default class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route
            path="/"
            exact
            component={asyncLoader(() => import("./contaniner/index"))}
          />
          <Route
            path="/home"
            exact
            component={asyncLoader(() => import("./contaniner/home"))}
          />
          <Route
            path="/about"
            exact
            component={asyncLoader(() => import("./contaniner/about"))}
          />
          <Route component={NoMatch} />
        </Switch>
      </HashRouter>
    );
  }
}
