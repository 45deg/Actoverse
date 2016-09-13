export function initActor(code){
    return { type: 'ACTOR_INIT' };
}

export function sendMessage(from, to, args){
    return {
        type: 'ACTOR_SEND',
        from,
        to,
        data: args
    };
}

export function spawnActor(actor, args){
    return {
        type: 'ACTOR_SPAWN',
        actor,
        args
    };
}

export function stepActor(msgIndex){
    return {
        type: 'ACTOR_STEP',
        msgIndex
    }
}

export function backActor(count = 1){
    return {
        type: 'ACTOR_BACK',
        count
    };
}