import socket from '../socket';

export function connectNetwork(target){
  return dispatch => {
    socket.connect(target).then(e => {
      dispatch({ type: 'CONNECT_NETWORK', target });
    });
  };
}
