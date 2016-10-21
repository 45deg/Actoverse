export function addSensorship(condition, action){
  return {
    type: 'ADD_SENSORSHIP',
    condition, action
  };
}

export function removeSensorship(index){
  return {
    type: 'REMOVE_SENSORSHIP',
    index
  };
}
