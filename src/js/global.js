import store from './store';
import Actor from './actor';
import lodash from 'lodash';

import { enqueueMessage, spawnActor } from './actions/vm';

export function mountGlobalObject(){
    var global = window;

    global.Actor = Actor;

    global._store = store;
    global.send = function(targetPid, ...data){
        store.dispatch(enqueueMessage(0, targetPid, data));
    };
    global.spawn = function(actor, ...args){
        store.dispatch(spawnActor(actor, args));
        return store.getState().vm.lastPid;
    };
    global._ = lodash;
}
