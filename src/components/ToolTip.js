import React, { Component } from 'react';
import { connect } from 'react-redux';

const ToolTip = ({ view, x, y, actor }) => {
  if(!view) return null;
  return (<div id="tooltip" style={{left: x + 'px', top: y + 'px'}}>
    <div><strong>{actor.constructor.name}#{actor.pid}</strong> ({actor._state})</div>
    {Object.keys(actor).filter(k => !k.startsWith('_') && k !== 'pid').map(name =>
        <div key={name}>{name}: {JSON.stringify(actor[name])}</div>
    )}
  </div>);
};


function mapStateToProps(state) {
    var data = state.diagram.tooltipData || {};
    return {
        view: state.diagram.tooltip,
        x: data.x,
        y: data.y,
        actor: data.actor,
    };
}

export default connect(mapStateToProps)(ToolTip);