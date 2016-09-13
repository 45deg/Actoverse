const code = (state, action) => {
    if(state === undefined) {
        state = localStorage.getItem('editor_code') || '';
    }

    switch(action.type) {
        case 'SET_CODE':
            localStorage.setItem('editor_code', action.code);
            return action.code;
        default:
            return state;
    }
};

export default code;