import socket from '../socket';

export function addCensorship(type, value){
  let object;
  try {
    object = JSON.parse(value);
  } catch (ex) {
    object = value; // not JSON => just a string
  }
  socket.send({
    type: 'add_filter',
    body: { type, value: object }
  });
}

export function removeCensorship(id){
  socket.send({
    type: 'remove_filter',
    id: id
  });
}
