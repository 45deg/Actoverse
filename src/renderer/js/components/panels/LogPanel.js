import React from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { saveCurrentSession } from '../../helpers/session';

const LogPanel = ({ actors, messageLogs }) => {
  return <div>
  <Button style={{margin: '5px 0'}} onClick={saveCurrentSession}>
    Save this session</Button>
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
      <td>{actors.getIn([body.get('sender'), 'class'], 'master')}#{body.get('sender')}</td>
      <td>{actors.getIn([body.get('target'), 'class'], 'master')}#{body.get('target')}</td>
      <td>{JSON.stringify(body.get('data').toJS())}</td>
      </tr>;
    })
  }</tbody>
  </Table>
  </div>;
};

function mapStateToProps(state) {
  return {
    messageLogs: state.shadow.messageLogs,
    actors: state.shadow.actors,
  };
}

export default connect(mapStateToProps)(LogPanel);
