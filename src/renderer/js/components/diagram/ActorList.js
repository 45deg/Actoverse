import React, { Component } from 'react';
import { connect } from 'react-redux';
import Actor from './Actor';

const ActorList = ({ actors, timeInterval, margin, width, messageNum }) => {
  return <g id="actor-container">{
    actors.valueSeq().map((actor, i) =>
      <Actor x={ width / (actors.size + 1) * (i + 1) }
        textY={18}
        lineStartY={margin /* TODO: implement uptime */}
        lineEndY={(messageNum + 1) * timeInterval + margin}
        name={actor.get('name')}
        pid={actor.get('pid')}
        key={actor.get('pid')} />
    ) }</g>;
}

function mapStateToProps(state) {
  return {
    actors: state.shadow.actors,
    messageNum: state.shadow.messageLog.length,
    width: state.ui.panelSize['root-panel'],
    timeInterval: state.ui.timeInterval,
  };
}

export default connect(mapStateToProps)(ActorList);
