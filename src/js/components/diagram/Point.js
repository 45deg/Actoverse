import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Popover, OverlayTrigger } from 'react-bootstrap';
import { backActor } from '../../actions/shadow';

const toolTip = (actor) => {
  if(actor === null) return null;
  return <Popover id="popover-trigger-focus" title={actor.get('name')}>
    {
      actor.get('state').map((value, key) =>
        <div key={key}>{key}: {JSON.stringify(value)}</div>
      )
    }
  </Popover>;
};

const Point = ({ cx, cy, rollback, actor, time }) => {
  return <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={toolTip(actor)}>
     <circle time={time} className="point" cx={cx} cy={cy} r="5" onClick={rollback} />
  </OverlayTrigger>;
};

function mapDispatchToProps(dispatch, ownProps) {
    return {
      rollback: () => dispatch({
        type: 'ROLLBACK_TIME',
        value: ownProps.time
      })
    }
}

export default connect(null, mapDispatchToProps)(Point);
