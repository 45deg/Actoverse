import socket from '../socket';

export function connectNetwork(target){
  return dispatch => {
    localStorage.setItem('target_url', target);
    socket.connect(target).then(e => {
      dispatch({ type: 'CONNECT_NETWORK', target });
    });
  };
}

export function disconnectNetwork(){
  return {
    type: 'DISCONNECT_NETWORK'
  }
}

export function changeReconnect(flag) {
  return {
    type: 'CHANGE_RECCONECT',
    reconnect: !!flag
  };
}
