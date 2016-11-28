export function addSession(body){
    return { type: 'ADD_SESSION', body };
}

export function removeSession(id){
    return { type: 'REMOVE_SESSION', id };
}
