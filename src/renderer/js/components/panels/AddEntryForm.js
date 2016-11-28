import React from 'react';
import { connect } from 'react-redux';
import { FormGroup, MenuItem, InputGroup,
         FormControl, DropdownButton, Form, Button } from 'react-bootstrap';

import { addCensorship } from '../../helpers/censorship';

const CENSORSHIP_OPTIONS = {
  types : [
    'sender_name',
    'target_name',
    'partial_match',
    'complete_match',
  ]
};

class AddEntryForm extends React.Component {
  constructor(props){
    super(props);
    this.initState();
  }
  initState(){
    this.state = { value: "",
                   type: CENSORSHIP_OPTIONS.types[0], };
  }
  onSelect(kind, key){
    this.setState({ [kind]: key });
  }
  onSubmit(){
    addCensorship(this.state.type, this.state.value);
    this.setState({ value: "" });
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
      <FormControl type="text" placeholder="Condition" value={this.state.value}
        onChange={e => this.setState({ value: e.target.value })} />
    </td>
    <td>
      <Button bsSize="small"
          onClick={this.onSubmit.bind(this)} >Add</Button>
    </td></tr>;
  }
}

export default AddEntryForm;
