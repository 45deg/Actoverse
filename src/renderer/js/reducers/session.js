function initState(){
  return {
    sessions: [], // sessions
    idCount : 0, // latest id number
    running : null, // currently runnning restoring
    finalizer: null, // the function that stop runnning restoring
  }
}

const session = (state = initState(), action) => {
  switch(action.type) {
    case 'ADD_SESSION':
      return { ...state,
        idCount: state.idCount + 1,
        sessions: [...state.sessions,
                  { id: state.idCount,
                    name: action.name,
                    time: action.time,
                    body: action.body }],
      };
    case 'REMOVE_SESSION':
      return { ...state,
        sessions: state.sessions.filter(e => e['id'] !== action.id)
      };
    case 'START_SESSION':
      return { ...state,
        running: action.id,
        finalizer: action.finalizer,
      };
    case 'STOP_SESSION':
      return { ...state,
        running: null,
        finalizer: null,
      };
    default:
      return state;
  }
};

export default session;
