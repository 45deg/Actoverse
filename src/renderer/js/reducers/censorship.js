function initState(){
  return [];
}

const censorship = (state = initState(), action) => {
    switch(action.type) {
        case 'ADD_SENSORSHIP':
            return [...state, {
              type: action.body.type,
              value: action.body.value,
              id: action.id
            }];
        case 'REMOVE_SENSORSHIP':
            return state.filter(element => element.id !== action.id);
        case 'EXPORT_SENSORSHIP':
            return action.filters.map(filter => ({
              type: filter.type,
              value: filter.value,
              id: filter.id
            }));
        default:
            return state;
    }
};

export default censorship;
