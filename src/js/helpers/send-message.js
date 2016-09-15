import store from '../store';
import { stepActor } from '../actions/vm';
import { scrollTo } from '../actions/diagram';

export default function sendMessage(message){
  var { vm:{ actors, messageLog }, diagram: {timeSpan} } = store.getState();
  var target = actors[message.to];
  var scrollValue = (messageLog.length + 1) * timeSpan + 40;
  store.dispatch(stepActor(message.uid));
  target[target._state](...message.data);
  store.dispatch(scrollTo(scrollValue));
}