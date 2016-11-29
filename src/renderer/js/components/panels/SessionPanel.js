import React from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { restoreSession } from '../../helpers/session';

import { bindActionCreators } from 'redux';
import * as sessionActionCreator from '../../actions/session';

const SessionPanel = ({ sessions, running, finalizer,
                        removeSession, startSession }) => {
  const handleClick = (id, body) => {
    if(running === null) {
      restoreSession(id, body);
    } else {
      finalizer();
    }
  };

  return <div>
  <Table striped bordered condensed hover>
  <thead><tr>
  <th>Restore</th><th>Name</th><th>Date</th><th> </th>
  </tr></thead>
  <tbody>{
    sessions.map(entry => {
      return <tr key={entry.id}>
        <td>
          <Button bsSize="small"
                  bsStyle={ running === entry.id ? "danger" : "primary" }
                  disabled={ running !== null && running !== entry.id }
                  onClick={ () => handleClick(entry.id, entry.body)}>
            { running === entry.id ? 'Stop' : 'Start' }
          </Button>
        </td>
        <td>{entry.name}</td>
        <td>{entry.time.toISOString()}</td>
        <td><Button bsSize="small" bsStyle="danger"
            disabled={ running !== null }
            onClick={() => removeSession(entry.id)} >Remove</Button></td>
      </tr>;
    })
  }</tbody>
  </Table>
  </div>;
};

function mapStateToProps(state) {
  return {
    sessions: state.session.sessions,
    running: state.session.running,
    finalizer: state.session.finalizer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(sessionActionCreator, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionPanel);
