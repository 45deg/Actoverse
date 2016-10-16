import React from 'react';
import { connect } from 'react-redux'

import { Button, Glyphicon, Form, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import { connectNetwork, disconnectNetwork } from '../actions/network';

import 'css/toolbar';

class ToolBar extends React.Component {
  constructor(props){
    super(props);
    this.state = { target: '' };
  }
  onSubmit(){
    if(!this.props.connected) {
      this.props.connect(this.state.target);
    } else {
      this.props.disconnect();
    }
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
        </FormGroup>
        <Button bsStyle="primary" onClick={this.onSubmit.bind(this)}>
          { !this.props.connected ? 'Connect' : 'Disconnect' }
       </Button>
      </Form>
    </div>);
  }
};

function mapStateToProps(state) {
  return {
    connected: state.network.connected,
    target: state.network.target,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    connect: (target) => dispatch(connectNetwork(target)),
    disconnect: () => dispatch(disconnectNetwork()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);
