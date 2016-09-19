import store from '../store';
import { sendMessage as sendMessageAction , discardMessage as discardMessageAction } from '../actions/vm';
import { scrollTo } from '../actions/diagram';

export function sendMessage(message){
  var { vm:{ actors, messageLog }, diagram: {timeInterval} } = store.getState();
  var target = actors[message.to];
  var scrollValue = (messageLog.length + 1) * timeInterval + 40;
  store.dispatch(sendMessageAction(message.uid));
  try {
    target.sender = message.from;
    target[target._state](...message.data);
    delete target.sender;
  } catch(e) {
    let err = "An error occurred while evaluating the code.";
    err += "\n\n[Message] " + e;
    alert(err);
  }
  store.dispatch(scrollTo(scrollValue));
}

export function discardMessage(message){
  var { vm:{ messageLog }, diagram: {timeInterval} } = store.getState();
  var scrollValue = (messageLog.length + 1) * timeInterval + 40;
  store.dispatch(discardMessageAction(message.uid));
  store.dispatch(scrollTo(scrollValue));
}