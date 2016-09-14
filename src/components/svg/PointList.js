import React, { Component } from 'react';
import { connect } from 'react-redux';
import Point from './Point';

const PointList = ({ timeSpan, margin, messageLog, width, actors }) => {
  return <g>{
    messageLog.map((msg, index) => {
      var actor;
      if( messageLog.length - 1 === index )
        actor = actors[msg.to];
      else
        actor = history[index + 1].actors[msg.to];

      return <Point cx={ width / actor.length * msg.to }
        cy={ (index + 1) * timeSpan + margin }
        backCount={messageLog.length - index - 1}
        actor={actor} key={msg.uid} />;
    })
  }</g>;
}
function mapStateToProps(state) {
  return {
    actors: state.vm.actors,
    messageLog: state.vm.messageLog,
    width: state.panels['root-panel'],
    timeSpan: state.diagram.timeSpan,
  };
}

export default connect(mapStateToProps)(PointList);