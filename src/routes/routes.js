import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from 'containers/MainPage';

const routes = (
  <Switch>
    <Route path="/" exact component={MainPage} />
  </Switch>
);

export default routes;
