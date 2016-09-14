import React, { Component } from 'react';
import { connect } from 'react-redux';

const Point = ({ cx, cy, moveBack, showToolTip, hideToolTip }) => {
  return <circle className="point" cx={cx} cy={cy} r="5" onClick={moveBack} onMouseOver={showToolTip} onMouseOut={hideToolTip} />
};

import { backActor } from '../../actions/vm';
import { showToolTip, hideToolTip } from '../../actions/diagram';


function mapDispatchToProps(dispatch, ownProps) {
    return {
      moveBack: () => dispatch(backActor(ownProps.backCount)),
      showToolTip: (e) => dispatch(showToolTip(e.pageX, e.pageY, ownProps.actor)),
      hideToolTip: () => dispatch(hideToolTip()),
    }
}

export default connect(null, mapDispatchToProps)(Point);