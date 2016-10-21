import { combineReducers } from 'redux';
import shadow from './shadow';
import ui from './ui';
import network from './network';
import modal from './modal';
import censorship from './censorship';

var reducers = combineReducers({
    shadow,
    ui,
    network,
    modal,
    censorship,
});

export default reducers;
