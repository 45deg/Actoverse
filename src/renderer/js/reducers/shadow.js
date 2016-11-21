import Immutable from 'immutable';

const LogRecord = Immutable.Record({
  type: '',
  timestamp: 0,
  body: Immutable.Map(),
});

function initState(){
  return {
    actors : Immutable.OrderedMap(),
    actorSnapshots : Immutable.Map(),
    messagePool: Immutable.Map(),
    messageLogs: Immutable.OrderedMap(),
    clock : 0,
  };
}

const shadow = (state = initState(), action) => {
  let { actors, actorSnapshots, messageLogs, clock, messagePool } = state;
  let imBody = Immutable.fromJS(action.body);
  // shadowing from API responses
  switch(action.type) {
    case 'INIT_STATE' : {
      return initState();
    }
    case 'ACTOR_CREATED': {
      return {
        ...state,
        actorSnapshots: actorSnapshots.setIn([action.pid, action.timestamp], imBody.get('state')),
        actors: actors.set(action.pid, imBody.set('pid', action.pid))
      };
    }
    case 'SEND_MESSAGE':
    case 'MESSAGE_RECEIVED': {
      let type = action.type === 'SEND_MESSAGE' ? 'send' : 'receive';
      return {
        ...state,
        messageLogs: messageLogs.update(action.pid, // source pid
                                        Immutable.List(), // default value
                                        log => log.push(new LogRecord({
                                          type,
                                          timestamp: action.timestamp,
                                          body: imBody
                                        }))
                                        )
      };
    }
    case 'ACTOR_UPDATED': {
      return {
        ...state,
        actorSnapshots: actorSnapshots.setIn([action.pid, action.timestamp], imBody),
        actors: actors.setIn([action.pid, 'state'], imBody),
        clock: Math.max(clock, action.timestamp)
      };
    }
    case 'ACTOR_REPLACED': {
      return {
        ...state,
        actors: actors.setIn([action.pid, 'state'], imBody.get('state'))
      };
    }
    case 'ROLLBACK_TIME': {
      return {
        ...state,
        messageLogs: messageLogs.map(log => log.filter(e => e.get('timestamp') < action.time)),
        actorSnapshots: actorSnapshots.map(actor => actor.filter((_, t) => t < action.time)),
        messagePool: messagePool.filter(time => time < action.time),
        clock: action.time,
      };
    }
    case 'POOL_ADD':
      return {
        ...state,
        messagePool: messagePool.set(imBody.get('uid'), action.time)
      };
    case 'POOL_REMOVE':
      return {
        ...state,
        messagePool: messagePool.delete(imBody.get('uid'))
      };
    default:
      return state;
  }
};

export default shadow;
