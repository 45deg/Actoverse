import store from './store';
import Actor from './actor';

import { sendMessage, spawnActor } from './actions/vm';

export function mountGlobalObject(){
    var global = window;

    global.Actor = Actor;

    global._store = store;
    global.send = function(sourcePid, targetPid, ...data){
        store.dispatch(sendMessage(sourcePid, targetPid, data));
    };
    global.spawn = function(actor, ...args){
        store.dispatch(spawnActor(actor, args));
        return store.getState().vm.lastPid;
    };
}