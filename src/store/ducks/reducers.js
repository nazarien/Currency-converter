import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import currencies from './currencies';
import currenciesFavorites from './currenciesFavorites';

export default history =>
  combineReducers({
    router: connectRouter(history),
    currencies,
    currenciesFavorites,
  });
