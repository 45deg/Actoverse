import React from 'react';
import { connect } from 'react-redux';
import { sendMessage,discardMessage } from '../helpers/handle-message';
import { backActor } from '../actions/vm';
import store from '../store';
import { shuffle } from 'lodash';
import { ButtonToolbar, ButtonGroup, Button, Glyphicon } from 'react-bootstrap';

import 'css/debug';

const StepField = ({ step, back, sendAll, sendAllRandomly, discard, messages, actors, clock }) => {
  return (<div id="controller">
        <div>
          <ButtonGroup bsSize="small">
            <Button onClick={sendAll} disabled={messages.length <= 0}>Flush</Button>
            <Button onClick={sendAllRandomly} disabled={messages.length <= 0}>Flush (random)</Button>
            <Button onClick={back} disabled={ clock <= 0 }>Back</Button>
          </ButtonGroup>
        </div>
        <ButtonToolbar>
        {
            messages.map((msg, index) => 
                <ButtonGroup key={msg.uid} bsSize="small">
                  <Button onClick={() => step(index)}>{`${msg.from}-(${JSON.stringify(msg.data)})->${msg.to}`}</Button>
                  <Button onClick={() => discard(index)}><Glyphicon glyph="remove" /></Button>
                </ButtonGroup>
            )
        }
        </ButtonToolbar>
        <p>
          <input type="button" className="btn btn-default" value="store" />
        </p>
    </div>);
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
    back: () => dispatch(backActor()),
    discard: (msg) => discardMessage(msg)
  };
}


function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, dispatchProps, stateProps, {
    step: (index) => dispatchProps.step(stateProps.messages[index]),
    sendAll: () => dispatchProps.sendAll(stateProps.messages, false),
    sendAllRandomly: () => dispatchProps.sendAll(stateProps.messages, true),
    discard: (index) => dispatchProps.discard(stateProps.messages[index]),
  })
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(StepField);