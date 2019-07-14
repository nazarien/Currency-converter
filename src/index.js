import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from 'store/configureStore';
import routes from 'routes/routes';

import CssBaseline from '@material-ui/core/CssBaseline';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Fragment>
        <CssBaseline />
        {routes}
      </Fragment>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
