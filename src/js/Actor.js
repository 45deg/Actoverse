import {
    enqueueMessage
} from './actions/vm';
import store from './store';
import {cloneDeep} from 'lodash';

class Actor {
  constructor(...args) {
    this._state = "receive";
    this._args = args;
  }
  send(targetPid, ...args) {
    store.dispatch(enqueueMessage(this.pid, targetPid, args));
  }
  become(listening) {
    this._state = listening;
  }
  get pid(){
    return this._pid;
  }
  exit() {
    this._state = "exit";
    this._down = store.getState().vm.clock;
  }

  _setPid(pid){
    this._pid = pid;
  }
  _clone() {
    var that = new this.constructor(...cloneDeep(this._args));
    for (let key of Object.keys(this)) {
      that[key] = cloneDeep(this[key]);
    }
    return that;
  }
}

export default Actor;
