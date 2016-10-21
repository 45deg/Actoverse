function initState(){
  return {
    visibility: false,
    message: '',
  };
}

const modal = (state = initState(), action) => {
  switch(action.type) {
    case 'SHOW_ALERT_MODAL':
      return {
        visibility: true,
        message: action.message,
      };
    case 'HIDE_ALERT_MODAL':
      return {
        visibility: false,
        message: null,
      };
    default:
      return state;
  }
};

export default modal;
