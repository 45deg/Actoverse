import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import createLogger from 'redux-logger';

const ignoreEvents = [
  'CHANGE_SIZE',
  'MOVE_TO_FRONT'
]
const loggerMiddleware = createLogger({
  predicate: (getState, action) => !ignoreEvents.includes(action.type)
});

const store = createStore(reducers, applyMiddleware(loggerMiddleware));
export default store;
