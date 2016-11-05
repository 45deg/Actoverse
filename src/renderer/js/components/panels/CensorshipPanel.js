import React from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import AddEntryForm from './AddEntryForm';

import { bindActionCreators } from 'redux';
import * as censorshipActionCreator from '../../actions/censorship';

const CensorshipPanel = ({ censorship, removeSensorship }) => {
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
                onClick={() => removeSensorship(entry.id)} >Remove</Button></td>
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
function mapDispatchToProps(dispatch) {
  return bindActionCreators(censorshipActionCreator, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CensorshipPanel);
