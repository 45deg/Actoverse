import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';

const LogPanel = ({ messageLogs }) => {
  console.log(messageLogs.valueSeq().flatten(true).toJS())
  return <Table striped bordered condensed hover>
    <caption>State</caption>
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
          <td>{body.get('sender')}</td>
          <td>{body.get('target')}</td>
          <td>{JSON.stringify(body.get('data').toJS())}</td>
        </tr>;
      })
    }</tbody>
  </Table>;
};

function mapStateToProps(state) {
  return {
    messageLogs: state.shadow.messageLogs
  };
}

export default connect(mapStateToProps)(LogPanel);
