import React from 'react';
import { connect } from 'react-redux';
import { FormGroup, MenuItem, InputGroup,
         FormControl, DropdownButton, Form, Button } from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import * as censorshipActionCreator from '../../actions/censorship';

const CENSORSHIP_OPTIONS = {
  types : [
    'sender_pid',
    'target_pid',
    'partial_match',
    'complete_match',
  ],
  actions : [
    'stop',
    'pass'
  ],
};

class AddEntryForm extends React.Component {
  constructor(props){
    super(props);
    this.initState();
  }
  initState(){
    this.state = { condition: "",
                   type: CENSORSHIP_OPTIONS.types[0],
                   action: CENSORSHIP_OPTIONS.actions[0] };
  }
  onSelect(kind, key){
    this.setState({ [kind]: key });
  }
  onSubmit(){
    this.props.addSensorship(this.state.type, this.state.condition, this.state.action);
    this.initState();
  }
  onSelect(key, index){
    this.setState({ [key]: CENSORSHIP_OPTIONS[key + 's'][index] });
  }
  render() {
    return <tr>
    <td>
    <DropdownButton title={this.state.type}
      bsSize="small" onSelect={this.onSelect.bind(this, 'type')}>
    {
      CENSORSHIP_OPTIONS.types.map((cmd, i) =>
        <MenuItem eventKey={i} id={i}>{cmd}</MenuItem>
      )
    }
    </DropdownButton>
    </td>
    <td>
      <FormControl type="text" placeholder="Condition" value={this.state.condition}
        onChange={e => this.setState({ condition: e.target.value })} />
    </td><td>
      <DropdownButton title={this.state.action}
        bsSize="small" onSelect={this.onSelect.bind(this, 'action')}>
      {
        CENSORSHIP_OPTIONS.actions.map((cmd, i) =>
          <MenuItem eventKey={i} id={i}>{cmd}</MenuItem>
        )
      }
      </DropdownButton>
    </td><td>
      <Button bsSize="small"
          onClick={this.onSubmit.bind(this)} >Add</Button>
    </td></tr>;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(censorshipActionCreator, dispatch);
}

export default connect(null, mapDispatchToProps)(AddEntryForm);
