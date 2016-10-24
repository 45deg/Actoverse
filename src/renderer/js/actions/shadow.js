import socket from '../socket';
import store from '../store';

export function rollbackTime(time){
  return dispatch => {
    dispatch({
      type: 'ROLLBACK_TIME',
      time
    });
    socket.send({
      type: 'rollback',
      time
    });
  };
}

export function initState(){
  return {
    'type': 'INIT_STATE'
  }
}
