function initState(){
    return {
        frontElementIndex: -1,
        tooltip: false,
        tooltipData: null,
        transform: '',
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
        case 'TRANSFORM_VIEWPORT':
            return Object.assign({}, state, { transform: action.transform});
        default:
            return state;
    }
};

export default diagram;