// This is the Container. Move this later.

import Message from './Message';
import { connect } from 'react-redux';

import { stepActor } from '../../actions/vm';
import { transformViewPort } from '../../actions/diagram';

function mapStateToProps(state) {
    return { 
        actors: state.vm.actors,
        messageQueue: state.vm.messageQueue
    };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onClickDispatch: (actors, msg) => {
      var target = actors[msg.to];
      dispatch(stepActor(ownProps.index));
      target[target._state](...msg.data);
      dispatch(transformViewPort(`translate(0, ${Math.min(-ownProps.toY + 400 - 20 * 3, 0)})`)); // evil magic nmber
    }
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, {
    onClick: () => dispatchProps.onClickDispatch(
      stateProps.actors,
      stateProps.messageQueue[ownProps.index],
      ownProps.index
    )
  })
}

const CandidateMessage = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Message);

export default CandidateMessage;