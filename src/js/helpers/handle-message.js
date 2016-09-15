import store from '../store';
import { stepActor, discardMessage as discardMessageAction } from '../actions/vm';
import { scrollTo } from '../actions/diagram';

export function sendMessage(message){
  var { vm:{ actors, messageLog }, diagram: {timeSpan} } = store.getState();
  var target = actors[message.to];
  var scrollValue = (messageLog.length + 1) * timeSpan + 40;
  store.dispatch(stepActor(message.uid));
  target[target._state](...message.data);
  store.dispatch(scrollTo(scrollValue));
}

export function discardMessage(message){
  var { vm:{ messageLog }, diagram: {timeSpan} } = store.getState();
  var scrollValue = (messageLog.length + 1) * timeSpan + 40;
  store.dispatch(discardMessageAction(message.uid));
  store.dispatch(scrollTo(scrollValue));
}