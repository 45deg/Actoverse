import React, { Component } from 'react';
import { connect } from 'react-redux';
import Point from './Point';

const PointList = ({ timeInterval, margin, messageLog, width, actors, history }) => {
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
        cy={ (messageLog.length - index) * timeInterval + margin }
        backCount={index}
        actor={actor} key={msg.uid} />;
    })
  }</g>;
}
function mapStateToProps(state) {
  return {
    actors: state.shadow.actors,
    history: state.shadow.history,
    messageLog: state.shadow.messageLog,
    width: state.panels['root-panel'],
    timeInterval: state.diagram.timeInterval,
  };
}

export default connect(mapStateToProps)(PointList);