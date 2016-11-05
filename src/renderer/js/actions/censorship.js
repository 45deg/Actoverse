import socket from '../socket';
import store from '../store';

export function addSensorship(type, value){
  socket.send({
    type: 'add_filter',
    body: { type, value: JSON.parse(value) }
  });
}

export function removeSensorship(id){
  socket.send({
    type: 'remove_filter',
    id: id
  });
}
