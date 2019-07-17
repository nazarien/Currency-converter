import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import MainWrapper from 'containers/MainWrapper';
import CurrencyConvert from 'containers/CurrencyConvert';
import ListOfCurrencies from 'containers/ListOfCurrencies';

const routes = (
  <Switch>
    <Redirect from="/" exact to="/currency-convert" />
    <MainWrapper>
      <Route path="/currency-convert" exact component={CurrencyConvert} />
      <Route path="/list-of-currencies" exact component={ListOfCurrencies} />
    </MainWrapper>
  </Switch>
);

export default routes;
