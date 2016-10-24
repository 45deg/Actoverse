import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Popover, OverlayTrigger } from 'react-bootstrap';
import { rollbackTime } from '../../actions/shadow';

const toolTip = (name, state) => {
  return <Popover id="popover-trigger-focus" title={name}>
    {
      state.map((value, key) =>
        <div key={key}>{key}: {JSON.stringify(value)}</div>
      )
    }
  </Popover>;
};

const Point = ({ cx, cy, rollback, name, state, time }) => {
  return <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={toolTip(name, state)}>
     <circle className="point" cx={cx} cy={cy} r="5" onClick={() => rollback(time)} />
  </OverlayTrigger>;
};

function mapDispatchToProps(dispatch, ownProps) {
  return {
    rollback: (time) => dispatch(rollbackTime(time))
  }
}

export default connect(null, mapDispatchToProps)(Point);
