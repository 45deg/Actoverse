import React from 'react';
import { connect } from 'react-redux';
import { Table, Button, Form, FormControl } from 'react-bootstrap';
import { saveCurrentSession } from '../../helpers/session';
import { toJSON } from '../../helpers/util';

class LogPanel extends React.Component {
  constructor(props){
    super(props);
    this.state = { sessionName: '' };
  }
  onSubmit(){
    saveCurrentSession(this.state.sessionName);
    this.setState({ sessionName: '' });
  }
  render(){
    let { actors, messageLogs } = this.props;
    return <div>
      <Form inline>
        <FormControl type="text" placeholder="Name"
          value={ this.state.sessionName }
          onChange={e => this.setState({ sessionName: e.target.value })}/>
        <Button style={{margin: '5px 0'}} onClick={() => this.onSubmit()}>
          Save this session</Button>
      </Form>
      <Table striped bordered condensed hover>
      <thead><tr>
      <th>LC</th><th>Type</th><th>Sender</th><th>Receiver</th><th>Data</th>
      </tr></thead>
      <tbody>{
        messageLogs.valueSeq().flatten(true)
        .sortBy(entry => entry.get('timestamp'))
        .map((entry, idx) => {
          let body = entry.get('body');
          return <tr key={idx}>
          <td>{entry.get('timestamp')}</td>
          <td>{entry.get('type')}</td>
          <td>{actors.getIn([body.get('sender'), 'kind'], 'master')}#{body.get('sender')}</td>
          <td>{actors.getIn([body.get('target'), 'kind'], 'master')}#{body.get('target')}</td>
          <td>{toJSON(body.get('data'))}</td>
          </tr>;
        })
      }</tbody>
      </Table>
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    messageLogs: state.shadow.messageLogs,
    actors: state.shadow.actors,
  };
}

export default connect(mapStateToProps)(LogPanel);
