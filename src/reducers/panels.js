function initState(){
  return {
    'root-panel' : 400,
    'vis-panel': 500
  };
}

const panels = (state = initState(), action) => {
    switch(action.type) {
        case 'CHANGE_SIZE':
            return Object.assign({}, state, {
              [action.name]: [action.size]
            });
        default:
            return state;
    }
};

export default panels;