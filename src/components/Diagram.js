import React, { Component } from 'react';
import { connect } from 'react-redux';

import MarkerDef from './svg/MarkerDef';
import ActorList from './svg/ActorList';
import PointList from './svg/PointList';
import MessageList from './svg/MessageList';
import DiagramScroller from './DiagramScroller';

const Diagram = ({ timeSpan, messageNum }) => {
    var margin = 40;
    return (<DiagramScroller>
      <svg width="100%" height={(messageNum + 1) * timeSpan + margin + 10}>
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
    timeSpan: state.diagram.timeSpan,
  };
}

export default connect(mapStateToProps)(Diagram);