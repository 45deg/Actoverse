function initState(){
  return {
    idCount : 0,
    sessions: [],
  }
}

const session = (state = initState(), action) => {
  switch(action.type) {
    case 'ADD_SESSION':
      return { ...state,
        idCount: state.idCount + 1,
        sessions: [...state.sessions, { id: state.idCount, body: action.body }],
      };
    case 'REMOVE_SESSION':
      return { ...state,
        sessions: state.sessions.filter(e => e['id'] !== action.id)
      };
    default:
      return state;
  }
};

export default session;
