export function addSensorship(type, condition, action){
  return {
    type: 'ADD_SENSORSHIP',
    filterType: type,
    condition, action,
  };
}

export function removeSensorship(index){
  return {
    type: 'REMOVE_SENSORSHIP',
    index
  };
}
