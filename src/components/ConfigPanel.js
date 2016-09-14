import React, { Component } from 'react';
import { connect } from 'react-redux';

const ConfigPanel = () => {
  return null;
}

function mapStateToProps(state) {
    return {
        messageLog: state.vm.messageLog
    };
}

export default connect(mapStateToProps)(ConfigPanel);