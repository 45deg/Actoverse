import React from 'react';
import { connect } from 'react-redux';
import { FormGroup, MenuItem, InputGroup, FormControl, DropdownButton, Form, Button } from 'react-bootstrap';
import { enqueueMessage } from '../actions/shadow';

class MessageGenerator extends React.Component {
  constructor(props){
    super(props);
    this.state = { from: null, to: null, data: '' };
  }
  onSelect(kind, key){
    this.setState({ [kind]: key });
  }
  isValid(){
    return this.state.from > 0 && this.state.to > 0 && this.state.data.length >= 0;
  }
  onSubmit(){
    var dataString = this.state.data;
    dataString = dataString.replace(/'/g, '"');
    if(!dataString.match(/^\s*\[.+\]\s*$/)) {
      dataString = '[' + dataString + ']';
    }
    var data = JSON.parse(dataString);
    this.props.dispatch(enqueueMessage(this.state.from, this.state.to, data));
  }
  render() {
    var { actors } = this.props;
    var { from, to } = this.state;
    var actorList = actors.slice(1);
    return <FormGroup bsSize="small">
      <InputGroup>
        <DropdownButton
          componentClass={InputGroup.Button}
          id="msg-from-dropdown"
          title={'From ' + (from ? '(#' + from + ')': '')}
          bsSize="small"
          onSelect={key => this.onSelect('from', key)}
        >
        { actorList.map((actor, i) => 
            <MenuItem eventKey={actor.pid} key={i}>{actor.constructor.name}#{actor.pid}</MenuItem>) 
        }
        </DropdownButton>
        <DropdownButton
          componentClass={InputGroup.Button}
          id="msg-to-dropdown"
          title={'To ' + (to ? '(#' + to + ')': '')}
          bsSize="small"
          onSelect={key => this.onSelect('to', key)}
          >
          { actorList.map((actor, i) => 
            <MenuItem eventKey={actor.pid} key={i}>{actor.constructor.name}#{actor.pid}</MenuItem>) 
          }
        </DropdownButton>
        <FormControl type="text" placeholder="Message (JSON)"
                     onChange={e => this.setState({ data: e.target.value })} />
        <InputGroup.Button>
          <Button bsSize="small" disabled={!this.isValid()}
                  onClick={this.onSubmit.bind(this)} >Add</Button>
        </InputGroup.Button>
      </InputGroup>
    </FormGroup>;
  }
}

function mapStateToProps(state) {
    return {
        actors: state.shadow.actors
    };
}

export default connect(mapStateToProps)(MessageGenerator);