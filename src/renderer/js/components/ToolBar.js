import React from 'react';
import { connect } from 'react-redux'

import { Button, Glyphicon, Form, FormControl, FormGroup, ControlLabel, Checkbox } from 'react-bootstrap';
import { connectNetwork, changeReconnect } from '../actions/network';

import 'css/toolbar';

class ToolBar extends React.Component {
  constructor(props){
    super(props);
    this.state = { target: location.search.substring(1) || '' };
  }
  onSubmit(){
    this.props.connect(this.state.target);
  }
  render(){
    return (<div className="toolbar-panel">
      <Form inline>
        <FormGroup>
          <ControlLabel>Target</ControlLabel>
          {' '}
          <FormControl type="text" placeholder="Ex. localhost:????"
            value={ this.state.target }
            onChange={e => this.setState({ target: e.target.value })}/>
          <Checkbox checked={this.props.reconnect} onChange={e => this.props.changeReconnect(e.target.checked)}>
            Auto-reconnect at disconnected
          </Checkbox>
        </FormGroup>
        <Button bsStyle="primary" onClick={this.onSubmit.bind(this)}>
          Connect
        </Button>
      </Form>
    </div>);
  }
};

function mapStateToProps(state) {
  return {
    connected: state.network.connected,
    reconnect: state.network.reconnect,
    target: state.network.target,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    connect: (target) => dispatch(connectNetwork(target)),
    changeReconnect: (target) => dispatch(changeReconnect(target))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);
