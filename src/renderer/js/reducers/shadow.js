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
    messagePool: Immutable.List(),
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
        actorSnapshots: actorSnapshots.setIn([action.name, action.timestamp], imBody.get('state')),
        actors: actors.set(action.name, imBody.set('name', action.name))
      };
    }
    case 'SEND_MESSAGE':
    case 'MESSAGE_RECEIVED': {
      let type = action.type === 'SEND_MESSAGE' ? 'send' : 'receive';
      return {
        ...state,
        messageLogs: messageLogs.update(action.name, // source name
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
        actorSnapshots: actorSnapshots.setIn([action.name, action.timestamp], imBody),
        actors: actors.setIn([action.name, 'state'], imBody),
        clock: Math.max(clock, action.timestamp)
      };
    }
    case 'ACTOR_REPLACED': {
      return {
        ...state,
        actors: actors.setIn([action.name, 'state'], imBody.get('state'))
      };
    }
    case 'ROLLBACK_TIME': {
      return {
        ...state,
        messageLogs: messageLogs.map(log => log.filter(e => e.get('timestamp') < action.time)),
        actorSnapshots: actorSnapshots.map(actor => actor.filter((_, t) => t < action.time)),
        messagePool: messagePool.filter(msg => msg.get('pooled_at') < action.time),
        clock: action.time,
      };
    }
    case 'POOL_ADD':
      return {
        ...state,
        messagePool: messagePool.push(imBody.set('pooled_at', action.time))
      };
    case 'POOL_REMOVE':
      let index = messagePool.findIndex(msg => imBody.get('uid') === msg.get('uid') &&
                                               imBody.get('sender') === msg.get('sender'));
      if(index === -1) {
        throw 'Error: no such a message';
        return state;
      }
      return {
        ...state,
        messagePool: messagePool.delete(index)
      };
    default:
      return state;
  }
};

export default shadow;
