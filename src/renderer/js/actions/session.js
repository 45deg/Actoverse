export function addSession(name, body){
    return { type: 'ADD_SESSION', name, body, time: new Date() };
}

export function removeSession(id){
    return { type: 'REMOVE_SESSION', id };
}
