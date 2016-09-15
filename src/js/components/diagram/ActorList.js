import React, { Component } from 'react';
import { connect } from 'react-redux';
import Actor from './Actor';

const ActorList = ({ actors, timeInterval, margin, width, messageNum }) => {
  return <g id="actor-container">{
    actors.map((actor, i) =>
      <Actor x={width / actors.length * actor.pid}
        textY={18}
        lineStartY={actor._up * timeInterval + margin}
        lineEndY={actor._down ? actor._down * timeInterval + margin : (messageNum + 1) * timeInterval + margin}
        text={actor.constructor.name + "\n#" + actor.pid}
        key={i} />
    ) }</g>;
}

function mapStateToProps(state) {
  return {
    actors: state.vm.actors,
    messageNum: state.vm.messageLog.length,
    width: state.panels['root-panel'],
    timeInterval: state.diagram.timeInterval,
  };
}

export default connect(mapStateToProps)(ActorList);