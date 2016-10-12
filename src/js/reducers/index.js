import { combineReducers } from 'redux';
import editor from './editor';
import shadow from './shadow';
import diagram from './diagram';
import panels from './panels';

var reducers = combineReducers({
    shadow,
    editor,
    diagram,
    panels
});

export default reducers;