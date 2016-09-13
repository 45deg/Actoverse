const panels = (state = {}, action) => {
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