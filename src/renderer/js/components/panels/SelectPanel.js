import React from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import socket from '../../socket';

const SelectPanel = ({ actors, messagePool }) => {
  return <Table striped bordered condensed hover>
  <caption>Messages Pool</caption>
  <thead><tr>
  <th> </th><th>Sender</th><th>Receiver</th><th>Data</th>
  </tr></thead>
  <tbody>{
    messagePool.map((body, idx) => {
      let onClick = () => {
        socket.send({
          type: 'select',
          sender: body.get('sender'),
          uid: body.get('uid'),
        })
      };
      return <tr key={idx}>
      <td><Button bsSize="small" onClick={onClick}>Send</Button></td>
      <td>{actors.getIn([body.get('sender'), 'kind'], 'master')}#{body.get('sender')}</td>
      <td>{actors.getIn([body.get('target'), 'kind'], 'master')}#{body.get('target')}</td>
      <td>{JSON.stringify(body.get('data').toJS())}</td>
      </tr>;
    })
  }</tbody>
  </Table>;
};

function mapStateToProps(state) {
  return {
    actors: state.shadow.actors,
    messagePool: state.shadow.messagePool
  };
}

export default connect(mapStateToProps)(SelectPanel);
