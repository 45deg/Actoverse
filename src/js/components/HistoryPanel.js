import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from './Table';

const HistoryPanel = ({ messageLog }) => {
  return <Table key={name} caption={name} headers={[
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
        messageLog: state.vm.messageLog
    };
}

export default connect(mapStateToProps)(HistoryPanel);