import React from 'react';
import { connect } from 'react-redux';

import { stepActor, backActor } from '../actions/vm';
import store from '../store';

// maybe this is called container

const StepField = ({ step, back, sendAll, messages, actors, clock }) => {
    return (<form id="controller">
        <p id="stepfield">
        {
            messages.map((msg, index) => 
                <input type="button" className="btn-control" key={msg.uid}
                    value={`${msg.from}-(${JSON.stringify(msg.data)})->${msg.to}`}
                    onClick={() => step(actors, msg, index)} />
            )
        }
        </p>
        <p>
            { messages.length > 0 ? <input type="button" className="btn-control" value="flush" onClick={
                () => sendAll(messages)} /> : null}
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
    step: (actors, msg, index) => {
      var target = actors[msg.to];
      dispatch(stepActor(index));
      target[target._state](...msg.data);
    },
    sendAll: (messages) => {
      messages.forEach((msg) => {
        var target = store.getState().vm.actors[msg.to];
        var index = store.getState().vm.messageQueue.findIndex(m => m.uid === msg.uid);
        console.log(index);
        dispatch(stepActor(index));
        target[target._state](...msg.data);
      });
    },
    back: () => dispatch(backActor())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StepField);