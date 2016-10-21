import React from 'react';
import { connect } from 'react-redux';
import { Table, FormGroup, MenuItem, InputGroup,
         FormControl, DropdownButton, Form, Button } from 'react-bootstrap';

class AddEntryForm extends React.Component {
  constructor(props){
    super(props);
    this.state = { condition: "", action: "" };
  }
  onSelect(kind, key){
    this.setState({ [kind]: key });
  }
  onSubmit(){
  }
  render() {
    return <FormGroup bsSize="small">
      <FormControl type="text" placeholder="Condition" value={this.state.condition}
        onChange={e => this.setState({ condition: e.target.value })} />
      <FormControl type="text" placeholder="Action" value={this.state.action}
          onChange={e => this.setState({ action: e.target.value })} />
      <Button bsSize="small"
          onClick={this.onSubmit.bind(this)} >Add</Button>
    </FormGroup>;
  }
}

const CensorshipPanel = () => {
  return <section id="censorship-panel">
    <Table striped bordered condensed hover>
      <caption>Censorship condition</caption>
      <thead><tr>
        <th>Condition</th><th>Action</th><th> </th>
      </tr></thead>
      <tbody><tr>
        <td>when.world.end == true</td><td>stop</td><td>DEL</td>
      </tr></tbody>
    </Table>
    <AddEntryForm />
  </section>;
}


export default CensorshipPanel;
