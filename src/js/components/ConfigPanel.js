import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTimeSpan, toggleMessage } from '../actions/diagram';

const ConfigPanel = ({ size, width, messageFlag, updateTimeSpan, toggleMessage }) => {
  return (<div id="config-panel">
    <p>
      <input type="checkbox" id="toggle-message" checked={messageFlag}
        onChange={e => toggleMessage(e.target.checked)}  />
        <label htmlFor="toggle-message">Show all messages</label>
    </p>
    <p>
      Interval size: <input type="range" min="1" max={width/3} value={size}
                       onChange={e => updateTimeSpan(e.target.value)} />
        <span>{size}</span>
    </p>
  </div>);
}

function mapStateToProps(state) {
    return {
        size: state.diagram.timeSpan,
        width: state.panels['root-panel'],
        messageFlag: state.diagram.showMessage,
    };
}


function mapDispatchToProps(dispatch) {
  return {
    updateTimeSpan: (value) => dispatch(updateTimeSpan(value)),
    toggleMessage: (value) => dispatch(toggleMessage(value))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigPanel);