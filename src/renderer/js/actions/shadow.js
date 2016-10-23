import socket from '../socket';
import store from '../store';

export function rollbackTime(time){
  return dispatch => {
    var shadow = store.getState().shadow;
    var actorAtTime = shadow.actorSnapshots[time - 1];
    for(let actor of actorAtTime) {
      socket.send({
        type: 'replace',
        target: actor.get('pid'),
        data: actor.toJS()
      });
    }
    dispatch({type:'ROLLBACK_TIME', time});
  };
}

export function initState(){
  return {
    'type': 'INIT_STATE'
  }
}
