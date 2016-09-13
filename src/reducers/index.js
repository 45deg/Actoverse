import { combineReducers } from 'redux';
import code from './code';
import vm from './vm';
import diagram from './diagram';

var reducers = combineReducers({
    vm,
    code,
    diagram
});

export default reducers;