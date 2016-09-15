import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Popover } from 'react-bootstrap';

const getToolTip = (actor) => {
  if(actor === null) return null;
  return <Popover id="popover-trigger-focus" title={actor.constructor.name}>
    {Object.keys(actor).filter(k => !k.startsWith('_') && k !== 'pid').map(name =>
        <div key={name}>{name}: {JSON.stringify(actor[name])}</div>
    )}
  </Popover>;
};
/*
function mapStateToProps(state) {
    return {
        actor: state.diagram.tooltipData,
    };
}
*/
export default getToolTip;
//export default connect(mapStateToProps)(ToolTip);