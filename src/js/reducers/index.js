import { combineReducers } from 'redux';
import shadow from './shadow';
import diagram from './diagram';
import panels from './panels';
import network from './network';
import modal from './modal';

var reducers = combineReducers({
    shadow,
    diagram,
    panels,
    network,
    modal,
});

export default reducers;
