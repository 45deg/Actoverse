import React from 'react';
import { connect } from 'react-redux';
import { FormGroup, MenuItem, InputGroup,
         FormControl, DropdownButton, Form, Button } from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import * as censorshipActionCreator from '../../actions/censorship';

const actions = [
  'stop',
  'pass'
];

class AddEntryForm extends React.Component {
  constructor(props){
    super(props);
    this.state = { condition: "", action: actions[0] };
  }
  onSelect(kind, key){
    this.setState({ [kind]: key });
  }
  onSubmit(){
    this.props.addSensorship(this.state.condition, this.state.action);
    this.setState({ condition: "", action: actoins[0] });
  }
  onSelect(key){
    this.setState({ action: actions[key] });
  }
  render() {
    return <tr>
    <td>
      <FormControl type="text" placeholder="Condition" value={this.state.condition}
        onChange={e => this.setState({ condition: e.target.value })} />
    </td><td>
      <DropdownButton title={this.state.action}
        bsSize="small" onSelect={this.onSelect.bind(this)}>
      {
        actions.map((cmd, i) =>
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
