import { combineReducers } from 'redux';
import shadow from './shadow';
import ui from './ui';
import network from './network';
import modal from './modal';
import filters from './filters';

var reducers = combineReducers({
    shadow,
    ui,
    network,
    modal,
    filters,
});

export default reducers;
