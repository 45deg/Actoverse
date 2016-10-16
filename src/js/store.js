import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import createLogger from 'redux-logger';

const loggerMiddleware = createLogger();

const store = createStore(reducers, applyMiddleware(loggerMiddleware));
export default store;
