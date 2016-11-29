export function addSession(name, body){
  return { type: 'ADD_SESSION', name, body, time: new Date() };
}

export function removeSession(id){
  return { type: 'REMOVE_SESSION', id };
}

export function startSession(id, finalizer){
  return { type: 'START_SESSION', id, finalizer };
}

export function stopSession(id){
  return { type: 'STOP_SESSION', id };
}
