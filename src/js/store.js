import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import createLogger from 'redux-logger';

const loggerMiddleware = createLogger({
  predicate: (getState, action) => action.type !== 'CHANGE_SIZE'
});

const store = createStore(reducers, applyMiddleware(loggerMiddleware));
export default store;
