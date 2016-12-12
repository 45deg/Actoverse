function initState(){
  return [];
}

const censorship = (state = initState(), action) => {
    switch(action.type) {
        case 'ADD_CENSORSHIP':
            return [...state, {
              type: action.body.type,
              value: action.body.value,
              id: action.id
            }];
        case 'REMOVE_CENSORSHIP':
            return state.filter(element => element.id !== action.id);
        case 'EXPORT_CENSORSHIP':
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
