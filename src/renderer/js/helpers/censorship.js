import socket from '../socket';

export function addCensorship(type, value){
  socket.send({
    type: 'add_filter',
    body: { type, value: JSON.parse(value) }
  });
}

export function removeCensorship(id){
  socket.send({
    type: 'remove_filter',
    id: id
  });
}
