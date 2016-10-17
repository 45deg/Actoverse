import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

const ignoreEvents = [
  'CHANGE_SIZE',
  'MOVE_TO_FRONT'
]
const loggerMiddleware = createLogger({
  predicate: (getState, action) => !ignoreEvents.includes(action.type)
});

const store = createStore(
  reducers,
  applyMiddleware(loggerMiddleware, thunkMiddleware)
);
export default store;
