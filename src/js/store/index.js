import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import reducer from '../reducers/reducer';

export default function configureStore() {
  const logger = createLogger();

  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(logger))
  );

  return store;
}