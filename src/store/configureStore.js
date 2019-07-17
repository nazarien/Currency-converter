import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'; // eslint-disable-line
import rootReducer from 'store/ducks/reducers';
import rootSaga from 'store/sagas/index';

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const logger = createLogger();

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer(history),
    preloadedState,
    composeWithDevTools(
      applyMiddleware(routerMiddleware(history), sagaMiddleware, logger)
    )
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
