import Immutable from 'immutable';

function initState(){
  return {
    actors : Immutable.List(),
    actorSnapshots : [],
    messageLog : [],
    clock: 0,
  };
}

const shadow = (state = initState(), action) => {
  let { actors, actorSnapshots, messageLog, clock } = state;
  let imBody = Immutable.fromJS(action.body);
  let targetIndex = actors.findKey(entry => entry.get('pid') === action.pid);
  // shadowing from API responses
  switch(action.type) {
    case 'INIT_STATE' : {
      return initState();
    }
    case 'ACTOR_CREATED': {
      return {
        ...state,
        actors: actors.push(imBody.set('pid', action.pid))
      };
    }
    case 'SEND_MESSAGE': {
      return {
        ...state,
        messageLog: [...messageLog,
          { type: 'send', time: clock, body: imBody, uid: imBody.get('uid') }],
      }
    }
    case 'MESSAGE_RECEIVED': {
      return {
        ...state,
        actorSnapshots: [...actorSnapshots, actors],
        messageLog: [...messageLog,
          { type: 'consume', time: clock + 1, body: imBody, uid: imBody.get('uid') }],
        clock: clock + 1
      };
    }
    case 'ACTOR_UPDATED': {
      return {
        ...state,
        actors: actors.setIn([targetIndex, 'state'], imBody)
      };
    }
    case 'ACTOR_REPLACED': {
      return {
        ...state,
        actors: actors.setIn([targetIndex, 'state'], imBody.get('state'))
      };
    }
    case 'ROLLBACK_TIME': {
      return {
        ...state,
        actorSnapshots: actorSnapshots.slice(0, action.time - 1),
        messageLog: messageLog.filter(msg => msg.time < action.time),
        clock: action.time - 1,
      };
    }
    default:
    return state;
  }
};

export default shadow;
