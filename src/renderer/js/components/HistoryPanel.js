import React, { Component } from 'react';
import { connect } from 'react-redux';
import DataTable from './DataTable';

const HistoryPanel = ({ messageLog }) => {
  return <DataTable key={name} headers={[
    { text: '#', name: 'index' },
    { text: 'From', name : 'from' },
    { text: 'To', name: 'to' },
    { text: 'Message', name: 'data', json: true }
  ]} elements={
    messageLog.map((e, index) => Object.assign({}, e, { index }))
  } />;
}

function mapStateToProps(state) {
    return {
        messageLog: state.shadow.messageLog
    };
}

export default connect(mapStateToProps)(HistoryPanel);