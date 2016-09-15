import React, { Component } from 'react';
import { connect } from 'react-redux';

const HistoryPanel = ({ messageLog }) => {
  return (<table className="stripe-table">
            <thead><tr>
              <th>#</th><th>From</th><th>To</th><th>Message</th>
            </tr></thead>
            <tbody>
              {messageLog.map((msg, i) => 
                <tr key={i}>
                  <td>#{i + 1}</td>
                  <td>{msg.from}</td>
                  <td>{msg.to}</td>
                  <td>{JSON.stringify(msg.data)}</td>
                </tr>
              )}
            </tbody>
           </table>);
}

function mapStateToProps(state) {
    return {
        messageLog: state.vm.messageLog
    };
}

export default connect(mapStateToProps)(HistoryPanel);