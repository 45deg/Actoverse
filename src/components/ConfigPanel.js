import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTimeSpan } from '../actions/diagram';

const ConfigPanel = ({ size, updateTimeSpan }) => {
  return (<div id="config-panel">
    <p>
      <input type="checkbox" id="toggle-message"/>
        <label htmlFor="toggle-message">Show all messages</label>
    </p>
    <p>
      Interval size: <input type="range" min="1" max="100" value={size} onChange={e => updateTimeSpan(e.target.value)} />
        <span>{size}</span>
    </p>
  </div>);
}

function mapStateToProps(state) {
    return {
        size: state.diagram.timeSpan
    };
}


function mapDispatchToProps(dispatch) {
  return {
    updateTimeSpan: (value) => { console.log(value); dispatch(updateTimeSpan(value)) }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigPanel);