import React, { Component } from 'react';
import { connect } from 'react-redux';
import Point from './Point';

const PointList = ({ timeSpan, margin, messageLog, width, actorNum }) => {
  return <g>{
    messageLog.map((msg, index) =>
      <Point cx={ width / actorNum * msg.to }
        cy={ (index + 1) * timeSpan + margin }
        backCount={ messageLog.length - index - 1 }
        actorPid={msg.to} key={index} />
    ) }</g>;
}
function mapStateToProps(state) {
  return {
    actorNum: state.vm.actors.length,
    messageLog: state.vm.messageLog,
    width: state.panels['root-panel']
  };
}

export default connect(mapStateToProps)(PointList);