import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';

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
  </section>;
}


export default CensorshipPanel;
