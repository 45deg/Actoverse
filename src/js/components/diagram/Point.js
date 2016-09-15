import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Popover, OverlayTrigger } from 'react-bootstrap';
import { backActor } from '../../actions/vm';

const toolTip = (actor) => {
  if(actor === null) return null;
  return <Popover id="popover-trigger-focus" title={actor.constructor.name}>
    {Object.keys(actor).filter(k => !k.startsWith('_') && k !== 'pid').map(name =>
        <div key={name}>{name}: {JSON.stringify(actor[name])}</div>
    )}
  </Popover>;
};

const Point = ({ cx, cy, moveBack, actor }) => {
  return <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={toolTip(actor)}>
    <circle className="point" cx={cx} cy={cy} r="5" onClick={moveBack} />
  </OverlayTrigger>
};


function mapDispatchToProps(dispatch, ownProps) {
    return {
      moveBack: () => dispatch(backActor(ownProps.backCount))
    }
}

export default connect(null, mapDispatchToProps)(Point);