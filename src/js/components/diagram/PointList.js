import React, { Component } from 'react';
import { connect } from 'react-redux';
import Point from './Point';

const PointList = ({ timeInterval, margin, messageLog, width, actors, actorSnapshots }) => {
  var currentTime = actorSnapshots.length - 1;
  var consumes = messageLog.filter(msg => msg.type === 'consume')
  return <g>{
    consumes.reverse().map((msg, msgIndex) => {
      var actor, index;
      var targetPid = msg.body.get('target');
      if( index === 0 ) {
        index = actors.findKey(entry => entry.get('pid') === targetPid);
        actor = actors.get(index);
      } else {
        index = actorSnapshots[currentTime].findKey(entry => entry.get('pid') === targetPid);
        actor = actorSnapshots[currentTime].get(index);
        currentTime = currentTime - 1;
      }
      return <Point cx={ width / (actors.size + 1) * (index + 1) }
        cy={ msg.time * timeInterval + margin }
        time={msg.time}
        actor={actor} key={msgIndex} />;
    })
  }</g>;
}
function mapStateToProps(state) {
  return {
    actors: state.shadow.actors,
    actorSnapshots: state.shadow.actorSnapshots,
    messageLog: state.shadow.messageLog,
    width: state.panels['root-panel'],
    timeInterval: state.diagram.timeInterval,
  };
}

export default connect(mapStateToProps)(PointList);
