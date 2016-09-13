import React from 'react';
import { connect } from 'react-redux';

import { stepActor, backActor } from '../actions/vm';

// maybe this is called container

const StepField = ({ step, back, messages, actors, clock }) => {
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
            { clock > 0 ? <input type="button" className="btn-control" value="back" onClick={back} /> : ''}
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
    back: () => dispatch(backActor())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StepField);