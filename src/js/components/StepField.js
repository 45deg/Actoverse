import React from 'react';
import { connect } from 'react-redux';
import sendMessage from '../helpers/send-message';
import { backActor } from '../actions/vm';
import store from '../store';
import { shuffle } from 'lodash';

import 'css/debug';

const StepField = ({ step, back, sendAll, sendAllRandomly, messages, actors, clock }) => {
  return (<form id="controller">
        <p id="stepfield">
        {
            messages.map((msg, index) => 
                <input type="button" className="btn-control" key={msg.uid}
                    value={`${msg.from}-(${JSON.stringify(msg.data)})->${msg.to}`}
                    onClick={() => step(index)} />
            )
        }
        </p>
        <p>
            { messages.length > 0 ? 
                <span>
                 <input type="button" className="btn-control" value="flush" onClick={sendAll} />
                 <input type="button" className="btn-control" value="flush (random)" onClick={sendAllRandomly} />
                </span>
              : null}
            { clock > 0 ? <input type="button" className="btn-control" value="back" onClick={back} /> : null}
        </p>
        <p>
          <input type="button" className="btn-control" value="store" />
        </p>
    </form>);
}

function mapStateToProps(state) {
    return {
        messages: state.vm.messageQueue,
        actors: state.vm.actors,
        clock: state.vm.clock
    };
}

function mapDispatchToProps(dispatch) {
  return {
    step: (msg) => sendMessage(msg),
    sendAll: (messages, random) => {
      if(random) messages = shuffle(messages);
      messages.forEach((msg) => sendMessage(msg));
    },
    back: () => dispatch(backActor())
  };
}


function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, dispatchProps, stateProps, {
    step: (index) => dispatchProps.step(stateProps.messages[index]),
    sendAll: () => dispatchProps.sendAll(stateProps.messages, false),
    sendAllRandomly: () => dispatchProps.sendAll(stateProps.messages, true)
  })
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(StepField);