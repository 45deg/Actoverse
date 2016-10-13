import { combineReducers } from 'redux';
import shadow from './shadow';
import diagram from './diagram';
import panels from './panels';

var reducers = combineReducers({
    shadow,
    diagram,
    panels
});

export default reducers;
