import Immutable from 'immutable';

function initState(actors){
  return {
    actors : Immutable.fromJS(actors),
    actorSnapshots : [],
    messageLog : [],
    clock: 0,
  };
}

const shadow = (state = initState({}), action) => {
  let { actors, actorSnapshots, messageLog, clock } = state;
  let imBody = Immutable.fromJS(action.body);
  let targetIndex = actors.findKey(entry => entry.get('pid') === action.pid);
  // shadowing from API responses
  switch(action.type) {
    case 'INIT_STATE':
    return initState(action.body);
    case 'QUEUE_RECEIVED': {
      return {
        ...state,
        messageLog: [...messageLog,
          { type: 'receive', time: clock, body: imBody }],
        actors: actors.updateIn([targetIndex, 'mailbox'],
                                mbox => mbox.push(imBody))
      };
    }
    case 'SEND_MESSAGE': {
      return {
        ...state,
        messageLog: [...messageLog,
          { type: 'send', time: clock, body: imBody }],
      }
    }
    case 'QUEUE_CONSUMED': {
      return {
        ...state,
        actorSnapshots: [...actorSnapshots, actors],
        messageLog: [...messageLog,
          { type: 'consume', time: clock + 1, body: imBody }],
        actors: actors.updateIn([targetIndex, 'mailbox'],
                                mbox => mbox.delete(mbox.keyOf(imBody))),
        clock: clock + 1
      };
    }
    case 'ACTOR_UPDATED': {
      return {
        ...state,
        actors: actors.setIn([targetIndex, 'state'], imBody)
      };
    }
    default:
    return state;
  }
};

export default shadow;
