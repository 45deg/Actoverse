import React, { Component } from 'react';
import { connect } from 'react-redux';
import { groupBy, toPairs, keys } from 'lodash';
import Table from './Table';

const StatusPanel = ({actors}) => {
  if(actors.length <= 1) return <div />;
  var groups = toPairs(groupBy(actors.slice(1), 'constructor.name'));
  return <div>{groups.map(([name, instances]) => {
    var members = keys(instances[0]).filter(m => !m.startsWith('_') && m != 'pid')
                                    .map(e => ({ name: e, text: e, json: true }));
    var headers = [
      { text: 'Pid', name: 'pid' },
      { text: 'Listening', name: '_state' }
    ].concat(members);
    return <Table key={name} caption={name} headers={headers} elements={instances} />;
  })}</div>;
}

function mapStateToProps(state) {
    return {
        actors: state.vm.actors
    };
}

export default connect(mapStateToProps)(StatusPanel);