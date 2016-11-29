import store from '../store';
import socket from '../socket';
import { addSession, startSession, stopSession } from '../actions/session';
import { rollbackTime } from '../actions/shadow';
import { addCensorship, removeCensorship } from './censorship';
import Immutable from 'immutable';

export function saveCurrentSession(name){
  var messageLogs = store.getState().shadow.messageLogs;
  var serialLog = messageLogs.valueSeq().flatten(true)
                             .sortBy(entry => entry.get('timestamp'));
  var sendLog = serialLog.filter(e => e.get('type') == 'receive');
  var sendMessages = sendLog.map(e => e.get('body'));
  store.dispatch(addSession(name, sendMessages.toList()));
}

// TODO: finilize uncompleted jobs

export function restoreSession(id, session){
  if(session.size === 0) return;
  var unsubscribe;
  var behavior;
  var censorshipId;
  var target = store.getState().network.target;

  function finalize(){
    unsubscribe(); // stop listening
    removeCensorship(censorshipId);
    store.dispatch(stopSession(id));
  }

  unsubscribe = store.subscribe(() => {
    let state = store.getState();
    if(behavior === "add_censorship") { // when added a censorship of 'any'
      let target = state.censorship.find(e => e.type === 'any');
      if(target) {
        censorshipId = target.id;
        behavior = "select";
        store.dispatch(rollbackTime(1)); // back to first state
      }
    } else if(behavior === "select") {
      // execute selecting msgs after the censorship is enabled
      let pool = state.shadow.messagePool; // Immutable.List
      let target = session.first();
      let selected = pool.find(msg => isEqualMessage(msg, target));
      console.log(selected);
      if(selected) { // found a message in the pool
        selectMessage(selected.get('sender'), selected.get('serial'));
        session = session.shift(); // pop a top one out
      } else { // not found
        if(session.size == 0) { // completed
          finalize();
        }
        /*if(target.size > 0) { // not completed all yet
          store.dispatch(showAlertModal("Message mismatch detected while restoring the session."));
        }*/
      }
    }

    if(!state.network.connected || target !== state.network.target) {
      // when disconnected
      finalize();
    }
  });

  // stage 0: command adding censorship
  addCensorship("any", null);
  behavior = "add_censorship";
  store.dispatch(startSession(id, finalize));
}

function isEqualMessage(a, b){
  return a.get('sender') == b.get('sender') &&
         a.get('target') == b.get('target') &&
         Immutable.is(a.get('data'), b.get('data'));
}

function selectMessage(sender, serial){
  socket.send({
    type: 'select',
    sender: sender,
    serial: serial
  });
}
