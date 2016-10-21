function initState(){
  return {
    connected: false,
    target: null,
  };
}

const network = (state = initState(), action) => {
    switch(action.type) {
        case 'CONNECT_NETWORK':
            return { ...state,
              connected: true,
              target: action.target,
            };
        case 'DISCONNECT_NETWORK':
            return { ...state,
              connected: false,
              target: null,
            };
        default:
            return state;
    }
};

export default network;
