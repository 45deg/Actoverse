import React, { Component } from 'react';
import { connect } from 'react-redux';
import Actor from './Actor';

const ActorList = ({ actors, timeSpan, margin, width, messageNum }) => {
  return <g id="actor-container">{
    actors.map((actor, i) =>
      <Actor x={width / actors.length * actor.pid}
        textY={18}
        lineStartY={actor._up * timeSpan + margin}
        lineEndY={actor._down ? actor._down * timeSpan + margin : (messageNum + 1) * timeSpan + margin}
        text={actor.constructor.name + "\n#" + actor.pid}
        key={i} />
    ) }</g>;
}

function mapStateToProps(state) {
  return {
    actors: state.vm.actors,
    messageNum: state.vm.messageLog.length,
    width: state.panels['root-panel'],
    timeSpan: state.diagram.timeSpan,
  };
}

export default connect(mapStateToProps)(ActorList);