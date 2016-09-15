import React, { Component } from 'react';
import { connect } from 'react-redux';
import Point from './Point';

const PointList = ({ timeSpan, margin, messageLog, width, actors, history }) => {
  var currentTime = history;
  return <g>{
    messageLog.concat().reverse().map((msg, index) => {
      var actor;
      if( index === 0 ) {
        actor = actors[msg.to];
      } else {
        actor = currentTime.actors[msg.to];
        currentTime = currentTime._prev;
      }

      return <Point cx={ width / actors.length * msg.to }
        cy={ (messageLog.length - index) * timeSpan + margin }
        backCount={index}
        actor={actor} key={msg.uid} />;
    })
  }</g>;
}
function mapStateToProps(state) {
  return {
    actors: state.vm.actors,
    history: state.vm.history,
    messageLog: state.vm.messageLog,
    width: state.panels['root-panel'],
    timeSpan: state.diagram.timeSpan,
  };
}

export default connect(mapStateToProps)(PointList);