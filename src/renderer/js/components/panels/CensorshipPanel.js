import React from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import AddEntryForm from './AddEntryForm';

import { removeCensorship } from '../../helpers/censorship';

const CensorshipPanel = ({ censorship, removeCensorship }) => {
  return <section id="censorship-panel">
    <Table striped bordered condensed hover>
      <caption>Censorship condition</caption>
      <thead><tr>
        <th>Type</th><th>Value</th><th> </th>
      </tr></thead>
      <tbody>
      {
        censorship.map((entry, index) =>
          <tr key={index}>
            <td>{entry.type}</td>
            <td>{JSON.stringify(entry.value)}</td>
            <td><Button bsSize="small" bsStyle="danger"
                onClick={() => removeCensorship(entry.id)} >Remove</Button></td>
          </tr>
        )
      }
      <AddEntryForm />
      </tbody>
    </Table>
  </section>;
}

function mapStateToProps(state) {
  return {
    censorship: state.censorship,
  };
}

export default connect(mapStateToProps)(CensorshipPanel);
