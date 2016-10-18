import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';

const StatePanel = ({actors}) => {
  return (<div>{
    actors.map((actor, key) => {
      return <div key={key}>
        <h2>{ actor.get('name') } #{ actor.get('pid') }</h2>
        <Table striped bordered condensed hover>
          <caption>State</caption>
          <thead><tr>
            <td>Key</td><td>Value</td>
          </tr></thead>
          <tbody>{
            actor.get('state').map((value, key) =>
              <tr key={key}><td>{key}</td><td>{JSON.stringify(value)}</td></tr>
            )
          }</tbody>
         </Table>
         <Table striped bordered condensed hover>
           <caption>Mailbox</caption>
           <thead><tr>
             <td>From</td><td>To</td><td>Data</td>
           </tr></thead>
           <tbody>{
             actor.get('mailbox').map((mail, key) =>
               <tr key={key}>
                 <td>{mail.get('sender')}</td>
                 <td>{mail.get('target')}</td>
                 <td>{JSON.stringify(mail.get('data'))}</td>
               </tr>
             )
           }</tbody>
          </Table>
      </div>;
    }).toArray()
  }</div>);
}

function mapStateToProps(state) {
    return {
        actors: state.shadow.actors
    };
}

export default connect(mapStateToProps)(StatePanel);
