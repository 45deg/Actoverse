import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';

const StateTable = ({state}) => {
  return <Table striped bordered condensed hover>
    <caption>State</caption>
    <thead><tr>
      <th>Key</th><th>Value</th>
    </tr></thead>
    <tbody>{
      state.map((value, key) =>
        <tr key={key}><td>{key}</td><td>{JSON.stringify(value)}</td></tr>
      )
    }</tbody>
  </Table>;
};

const MailboxTable = ({mailbox}) => {
  return <Table striped bordered condensed hover>
    <caption>Mailbox</caption>
    <thead><tr>
      <th>From</th><th>To</th><th>Data</th>
    </tr></thead>
    <tbody>{
      mailbox.map((mail, key) =>
        <tr key={key}>
          <td>{mail.get('sender')}</td>
          <td>{mail.get('target')}</td>
          <td>{JSON.stringify(mail.get('data'))}</td>
        </tr>
      )
    }</tbody>
   </Table>;
};

class ActorEntry extends React.Component {

  constructor(props) {
    super(props);
    this.state = { showDetails: false };
  }

  toggleDetails(){
    this.setState({ showDetails: !this.state.showDetails });
  }

  render(){
    var actor = this.props.actor;
    return <div>
      <h2 className={ this.state.showDetails ? 'tables-open' : 'tables-closed'}
          onClick={this.toggleDetails.bind(this)}>
        { actor.get('kind') } #{ actor.get('name') }
      </h2>
      { this.state.showDetails &&
        <div className="tables-container">
          <StateTable state={actor.get('state')} />
          {/* <MailboxTable mailbox={actor.get('mailbox')} /> */}
        </div>
      }
    </div>;
  }
}

const StatePanel = ({actors}) => {
  return <section id="state-panel">{
    actors.map((actor, key) =>
      <ActorEntry actor={actor} key={key} />).toArray()
  }</section>;
}

function mapStateToProps(state) {
    return {
        actors: state.shadow.actors
    };
}

export default connect(mapStateToProps)(StatePanel);
