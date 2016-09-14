function initState(){
    return {
        frontElementIndex: -1,
        tooltip: false,
        tooltipData: null,
        scrollValue: 0,
    };
}

const diagram = (state = initState(), action) => {
    switch(action.type) {
        case 'MOVE_TO_FRONT':
            return Object.assign({}, state, { frontElementIndex: action.index });
        case 'SHOW_TOOLTIP':
            return Object.assign({}, state, { 
                tooltip: true,
                tooltipData: action.data
            });
        case 'HIDE_TOOLTIP':
            return Object.assign({}, state, { tooltip: false });
        case 'SCROLL_TO':
            return Object.assign({}, state, { scrollValue: action.value });
        case 'UPDATE_TIMESPAN':
            return Object.assign({}, state, { timeSpan: action.value });
        default:
            return state;
    }
};

export default diagram;