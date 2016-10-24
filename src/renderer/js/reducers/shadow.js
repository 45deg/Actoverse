import Immutable from 'immutable';

function initState(){
  return {
    actors : Immutable.OrderedMap(),
    actorSnapshots : Immutable.Map(),
    messageLog : [],
    clock : 0,
  };
}

const shadow = (state = initState(), action) => {
  let { actors, actorSnapshots, messageLog, clock } = state;
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
    case 'SEND_MESSAGE': {
      return {
        ...state,
        messageLog: [...messageLog,
          { type: 'send', time: action.timestamp, body: imBody, uid: imBody.get('uid') }],
      }
    }
    case 'MESSAGE_RECEIVED': {
      return {
        ...state,
        messageLog: [...messageLog,
          { type: 'consume', time: action.timestamp, body: imBody, uid: imBody.get('uid') }],
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
        messageLog: messageLog.filter(e => e.time < action.time),
        actorSnapshots: actorSnapshots.map(actor => actor.filter((_, t) => t < action.time)),
        clock: action.time,
        //actors null
      };
    }
    default:
    return state;
  }
};

export default shadow;
