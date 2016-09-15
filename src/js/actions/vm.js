export function initActor(code){
    return { type: 'ACTOR_INIT' };
}

export function enqueueMessage(from, to, args){
    return {
        type: 'ENQUEUE_MESSAGE',
        from,
        to,
        data: args
    };
}

export function discardMessage(uid){
    return {
        type: 'DISCARD_MESSAGE',
        uid
    };
}

export function spawnActor(actor, args){
    return {
        type: 'ACTOR_SPAWN',
        actor,
        args
    };
}

export function sendMessage(uid){
    return {
        type: 'SEND_MESSAGE',
        uid
    }
}

export function backActor(count = 1){
    return {
        type: 'ACTOR_BACK',
        count
    };
}