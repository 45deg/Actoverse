// This is the Container. Move this later.

import Message from './Message';
import { connect } from 'react-redux';

import sendMessage from '../../helpers/send-message';

function mapStateToProps(state) {
  return {
    messageQueue: state.vm.messageQueue,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onClick: (msg) => sendMessage(msg)
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, {
    onClick: () => dispatchProps.onClick(
      stateProps.messageQueue.find(msg => msg.uid === ownProps.id),
    )
  })
}

const CandidateMessage = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Message);

export default CandidateMessage;