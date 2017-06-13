import React, { Component } from 'react';
import { connect } from 'react-redux';

import MarkerDef from './diagram/MarkerDef';
import ActorList from './diagram/ActorList';
import PointList from './diagram/PointList';
import MessageList from './diagram/MessageList';
import TimeScale from './diagram/TimeScale';
import DiagramScroller from './DiagramScroller';

import 'css/diagram';

const Diagram = ({ timeInterval, clock }) => {
    var margin = 40;
    return (<DiagramScroller>
      <svg width="100%" height={(clock + 1) * timeInterval + margin + 10}>
        <TimeScale margin={margin} />
        <ActorList margin={margin} />
        <MessageList margin={margin} />
        <PointList margin={margin} />
        <defs>
          <MarkerDef color="#000" id="arrowhead-normal" />
          <MarkerDef color="#F00" id="arrowhead-hover" />
        </defs>
      </svg>
    </DiagramScroller>);
}

function mapStateToProps(state) {
  return {
    clock: state.shadow.clock,
    width: state.ui.panelSize,
    timeInterval: state.ui.timeInterval,
  };
}

export default connect(mapStateToProps)(Diagram);
