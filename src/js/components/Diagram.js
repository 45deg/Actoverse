import React, { Component } from 'react';
import { connect } from 'react-redux';

import MarkerDef from './diagram/MarkerDef';
import ActorList from './diagram/ActorList';
import PointList from './diagram/PointList';
import MessageList from './diagram/MessageList';
import TimeScale from './diagram/TimeScale';
import DiagramScroller from './DiagramScroller';

import 'css/diagram';

const Diagram = ({ timeInterval, messageNum }) => {
    var margin = 40;
    return (<DiagramScroller>
      <svg width="100%" height={(messageNum + 1) * timeInterval + margin + 10}>
        <TimeScale margin={margin} />
        <ActorList margin={margin} />
        <MessageList margin={margin} />
        <PointList margin={margin} />
        <defs>
          <MarkerDef color="#000" id="arrowhead-normal" />
          <MarkerDef color="#F00" id="arrowhead-hover" />
          <MarkerDef color="#777" id="arrowhead-candidate" />
        </defs>
      </svg>
    </DiagramScroller>);
}

function mapStateToProps(state) {
  return {
    messageNum: state.vm.messageLog.length,
    width: state.panels['root-panel'],
    timeInterval: state.diagram.timeInterval,
  };
}

export default connect(mapStateToProps)(Diagram);
