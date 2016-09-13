import React, { Component } from 'react';
import { connect } from 'react-redux';

const Point = ({ cx, cy, moveBack, showToolTip, hideToolTip }) => {
  return <circle className="point" cx={cx} cy={cy} r="5" onClick={moveBack} onMouseOver={showToolTip} onMouseOut={hideToolTip} />
};

import { backActor } from '../../actions/vm';
import { showToolTip, hideToolTip } from '../../actions/diagram';

function mapStateToProps(state) {
    return {
        clock: state.vm.clock,
        actors: state.vm.actors,
        history: state.vm.history,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
      moveBack: () => dispatch(backActor(ownProps.backCount)),
      showToolTipDispatch: (x, y, actor) => dispatch(showToolTip(x, y, actor)),
      hideToolTip: () => dispatch(hideToolTip()),
    }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, dispatchProps, {
    showToolTip: (e) => {
      var {clock, actors, history} = stateProps;
      var {backCount, actorPid} = ownProps;
      var actor = backCount === 0 ? actors[actorPid]
                                  : history[history.length-backCount].actors[actorPid];
      dispatchProps.showToolTipDispatch(e.pageX, e.pageY, actor)
    }
  });
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Point);