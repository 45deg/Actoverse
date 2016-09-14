import React from 'react';
import { connect } from 'react-redux';
import sendMessage from '../helpers/send-message';
import { backActor } from '../actions/vm';
import store from '../store';

// maybe this is called container

const StepField = ({ step, back, sendAll, messages, actors, clock }) => {
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
            { messages.length > 0 ? <input type="button" className="btn-control" value="flush" onClick={sendAll} /> : null}
            { clock > 0 ? <input type="button" className="btn-control" value="back" onClick={back} /> : null}
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
    sendAll: (messages) => {
      messages.forEach((msg) => sendMessage(msg));
    },
    back: () => dispatch(backActor())
  };
}


function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, dispatchProps, stateProps, {
    step: (index) => dispatchProps.step(stateProps.messages[index]),
    sendAll: () => dispatchProps.sendAll(stateProps.messages)
  })
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(StepField);