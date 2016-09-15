import React, { Component } from 'react';
import { connect } from 'react-redux';
import { groupBy, toPairs, keys } from 'lodash';

import 'css/table';

const StatusPanel = ({actors}) => {
  if(actors.length <= 1) return <div />;
  var groups = toPairs(groupBy(actors.slice(1), 'constructor.name'));
  return <div>{groups.map(([name, instances]) => {
    var members = keys(instances[0]).filter(m => !m.startsWith('_') && m != 'pid');
    return (<table className="stripe-table" key={name}>
          <caption>{name}</caption>
          <thead>
            <tr>
              <th>Pid</th>
              <th>Listening</th>
              {members.map((m, i) => <th key={i}>{m}</th>)}
            </tr>
          </thead>
          <tbody>
            {instances.map((instance, i) => 
                <tr key={i}>
                  <td>{instance.pid}</td><td>{instance._state}</td>
                  {members.map((m,j) => <td key={j}>{JSON.stringify(instance[m])}</td>)}
                </tr>
            )}
          </tbody>
      </table>);
  })}</div>;
}

function mapStateToProps(state) {
    return {
        actors: state.vm.actors
    };
}

export default connect(mapStateToProps)(StatusPanel);