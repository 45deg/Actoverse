function initState(){
    return {
        frontElementIndex: -1,
        scrollValue: 0,
        timeInterval: 50,
        showMessage: true,
        panelSize: 400,
    };
}

const ui = (state = initState(), action) => {
    switch(action.type) {
        case 'MOVE_TO_FRONT':
            return   { ...state, frontElementIndex: action.index };
        case 'SCROLL_TO':
            return   { ...state, scrollValue: action.value };
        case 'UPDATE_TIMESPAN':
            return   { ...state, timeInterval: action.value };
        case 'TOGGLE_MESSAGE':
            return   { ...state, showMessage: action.value };
        case 'CHANGE_PANEL_SIZE':
            return   { ...state,
              panelSize: action.size
            };
        default:
            return state;
    }
};

export default ui;
