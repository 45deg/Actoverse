import { times, constant, get, defaultTo } from 'lodash';

function initState(){
    return {
        actors : [],
        history : {},
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
        case 'ENQUEUE_MESSAGE':
            let {from, to, data} = action;
            return   { ...state,
                messageQueue:  [...state.messageQueue, {
                    from, to, data,
                    timestamp: state.clock,
                    uid: state.uid
                }],
                uid: state.uid + 1
            };
        case 'SPAWN_ACTOR':
            var newActor = new action.actor(...action.args);
            newActor.pid = lastPid + 1;
            newActor._up = clock;
            return   { ...state,
                actors : replace(state.actors, lastPid + 1, newActor),
                lastPid: lastPid + 1
            };
        case 'SEND_MESSAGE':
            let msgIndex = messageQueue.findIndex(m => m.uid === action.uid);
            if(msgIndex < 0) return state;
            return   { ...state,
                history: {
                    actors: actors.map(e => e.clone()),
                    queue: messageQueue.concat(),
                    _prev: history
                },
                actors: actors.concat(),
                messageLog: [...messageLog, messageQueue[msgIndex]],
                messageQueue: remove(messageQueue, msgIndex),
                clock: clock + 1
            };
        case 'ACTOR_BACK':
            if(action.count === 0) return state;
            let count = defaultTo(action.count, 1);
            // point = history._prev._prev [... count times ...] ._prev
            let point = get(history, times(count - 1, constant('_prev')), history);
            return   { ...state,
                history: point._prev,
                actors: point.actors,
                messageQueue: point.queue,
                messageLog: messageLog.slice(0, -count),
                clock: clock - count
            };
        case 'DISCARD_MESSAGE': {
            let msgIndex = messageQueue.findIndex(m => m.uid === action.uid);
            if(msgIndex < 0) return state;
            return   { ...state,
                history: {
                    actors: actors.map(e => e.clone()),
                    queue: messageQueue.concat(),
                    _prev: history
                },
                actors: actors.concat(),
                messageLog: [...messageLog, 
                    { ...messageQueue[msgIndex] , discard: true }
                ],
                messageQueue: remove(messageQueue, msgIndex),
                clock: clock + 1
            };
        }
        default:
            return state;
    }
};

export default vm;