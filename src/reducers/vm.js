function initState(){
    return {
        actors : [],
        history : [],
        lastPid : 0,
        clock : 0,
        messageQueue: [],
        messageLog : [],
        uid : 0  
    };
}

function replace(array, index, element){
    var arr = array.concat();
    arr[index] = element;
    return arr;
}
function remove(array, index){
    var arr = array.concat();
    arr.splice(index, 1);
    return arr;
}

const vm = (state = initState(), action) => {
    let {messageQueue, lastPid, messageLog, actors, clock, history} = state;

    switch(action.type) {
        case 'ACTOR_INIT':
            return initState();
        case 'ACTOR_SEND':
            let {from, to, data} = action;
            return Object.assign({}, state, { 
                messageQueue:  [...state.messageQueue, {
                    from, to, data,
                    timestamp: state.clock,
                    uid: state.uid
                }],
                uid: state.uid + 1
            });
        case 'ACTOR_SPAWN':
            var newActor = new action.actor(...action.args);
            newActor.pid = lastPid + 1;
            newActor._up = clock;
            return Object.assign({}, state, { 
                actors : replace(state.actors, lastPid + 1, newActor),
                lastPid: lastPid + 1
            });
        case 'ACTOR_STEP':
            return Object.assign({}, state, { 
                history: [...history, {
                    actors: actors.map(e => e.clone()),
                    queue: messageQueue.concat()
                }],
                actors: actors.concat(),
                messageLog: [...messageLog, messageQueue[action.msgIndex]],
                messageQueue: remove(messageQueue, action.msgIndex),
                clock: clock + 1
            });
        case 'ACTOR_BACK':
            if(action.count === 0) return state;
            let count = action.count || 1;
            let point = history[history.length - count];
            return Object.assign({}, state, { 
                history: history.slice(0, -count),
                actors: point.actors,
                messageQueue: point.queue,
                messageLog: messageLog.slice(0, -count),
                clock: clock - count
            });
        default:
            return state;
    }
};

export default vm;