function initState(){
  return [];
}

const network = (state = initState(), action) => {
    switch(action.type) {
        case 'ADD_SENSORSHIP':
            return [...state, {
              condition: action.condition,
              action: action.action,
            }];
        case 'REMOVE_SENSORSHIP':
            return state.filter((_, index) => index !== action.index);
        default:
            return state;
    }
};

export default network;
