import { combineReducers } from 'redux';
import code from './code';
import vm from './vm';
import diagram from './diagram';
import panels from './panels';

var reducers = combineReducers({
    vm,
    code,
    diagram,
    panels
});

export default reducers;