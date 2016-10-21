import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as diagramActionCreator from '../actions/diagram';

import { FormGroup, Checkbox, Col } from 'react-bootstrap';

import 'css/debug';

const ConfigPanel = ({ size, width, messageFlag, updateTimeSpan, toggleMessage }) => {
  return (<div id="config-panel">
    <form>
    <FormGroup>
      <Checkbox checked={messageFlag}　onChange={e => toggleMessage(e.target.checked)}>Show all messages</Checkbox>
    </FormGroup>
    <FormGroup controlId="formHorizontalPassword">
      <Col sm={3}>
        IntervalSize
      </Col>
      <Col sm={12-3}>
        <input type="range" min="1" max={width/3} value={size} className="slider"
                       onChange={e => updateTimeSpan(e.target.value)} />
                        <span>{size}</span>
      </Col>
    </FormGroup>
    </form>
  </div>);
}

function mapStateToProps(state) {
    return {
        size: state.ui.timeInterval,
        width: state.ui.panelSize['root-panel'],
        messageFlag: state.ui.showMessage,
    };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(diagramActionCreator, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigPanel);
