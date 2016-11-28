import store from '../store';
import { addSession } from '../actions/session';

export function saveCurrentSession(){
  var messageLogs = store.getState().shadow.messageLogs;
  var serialLog = messageLogs.valueSeq().flatten(true)
                             .sortBy(entry => entry.get('timestamp'));
  var sendLog = serialLog.filter(e => e.get('type') == 'send');
  var sendMessages = sendLog.map(e => e.get('body'));
  store.dispatch(addSession(sendMessages.toJS()));
}
