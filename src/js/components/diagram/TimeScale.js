import React, { Component } from 'react';
import { connect } from 'react-redux';
import { range } from 'lodash';

const TimeScale = ({ margin, clock, width, timeInterval }) => {
    return <g>{
      range(0, clock + 1).map(c => {
        let y = c * timeInterval + margin;
        return <g className="moment" >
          <line x1={0} x2={width} y1={y} y2={y} />
          <text x={3} y={y-3}>{c}</text>
        </g>;
      })
    }</g>;
}

function mapStateToProps(state) {
  return {
    clock: state.vm.clock,
    width: state.panels['root-panel'],
    timeInterval: state.diagram.timeInterval,
  };
}

export default connect(mapStateToProps)(TimeScale);
