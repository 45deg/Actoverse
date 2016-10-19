export function showAlertModal(message){
  return {
    type: 'SHOW_ALERT_MODAL',
    message
  }
}

export function hideAlertModal(){
  return {
    type: 'HIDE_ALERT_MODAL'
  };
}
