import React, { Component } from 'react';
import { connect } from 'react-redux';

import MarkerDef from './svg/MarkerDef';
import ActorList from './svg/ActorList';
import PointList from './svg/PointList';
import MessageList from './svg/MessageList';
import DiagramScroller from './DiagramScroller';

const Diagram = ({ messageNum, width }) => {
    var margin = 40;
    var timeSpan = width / 8;
    return (<DiagramScroller>
      <svg width="100%" height={(messageNum + 1) * timeSpan + margin + 10}>
        <ActorList timeSpan={timeSpan} margin={margin} />
        <MessageList timeSpan={timeSpan} margin={margin} />
        <PointList timeSpan={timeSpan} margin={margin} />
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
    width: state.panels['root-panel']
  };
}

export default connect(mapStateToProps)(Diagram);