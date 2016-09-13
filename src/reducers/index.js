import { combineReducers } from 'redux';
import editor from './editor';
import vm from './vm';
import diagram from './diagram';
import panels from './panels';

var reducers = combineReducers({
    vm,
    editor,
    diagram,
    panels
});

export default reducers;