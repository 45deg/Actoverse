import { combineReducers } from 'redux';
import shadow from './shadow';
import diagram from './diagram';
import panels from './panels';
import network from './network';

var reducers = combineReducers({
    shadow,
    diagram,
    panels,
    network,
});

export default reducers;
