import React, { Component } from 'react';
import { connect } from 'react-redux';
import Point from './Point';

const PointList = ({ timeInterval, margin, width, actors, actorSnapshots }) => {
  return <g>{
    actorSnapshots.map((snapshots, name) => {
      let index = actors.keySeq().findIndex(k => k === name);
      let actorClass = actors.getIn([name, 'class']);
      return snapshots
        .filter((_, time) => time > 0)
        .map((state, time) => {
        return <Point cx={ width / (actors.size + 1) * (index + 1) }
          cy={time * timeInterval + margin }
          time={time}
          klass={actorClass} state={state} key={`${name}_${time}`} />;
      }).valueSeq();
    }).valueSeq()
  }</g>;
}
function mapStateToProps(state) {
  return {
    actors: state.shadow.actors,
    actorSnapshots: state.shadow.actorSnapshots,
    width: state.ui.panelSize['root-panel'],
    timeInterval: state.ui.timeInterval,
  };
}

export default connect(mapStateToProps)(PointList);
