import React from "react";
import { Route, Switch } from "react-router-dom";
import ComparisonForm from "../../containers/ComparisonForm";
import Play from "../play";
import ComparisonResult from "../ComparisonResult";

const Main = props => (
  <Switch>
    <Route exact path="/" component={ComparisonForm} />
    <Route path="/play" component={Play} />
    <Route path="/comparisonResult" component={ComparisonResult} />
  </Switch>
);

export default Main;
