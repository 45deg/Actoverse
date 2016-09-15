import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Popover, OverlayTrigger } from 'react-bootstrap';
import { backActor } from '../../actions/vm';
import getToolTip from '../ToolTip';

const Point = ({ cx, cy, moveBack, actor }) => {
  return <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={getToolTip(actor)}>
    <circle className="point" cx={cx} cy={cy} r="5" onClick={moveBack} />
  </OverlayTrigger>
};


function mapDispatchToProps(dispatch, ownProps) {
    return {
      moveBack: () => dispatch(backActor(ownProps.backCount))
    }
}

export default connect(null, mapDispatchToProps)(Point);