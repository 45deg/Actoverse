import React from 'react';
import { connect } from 'react-redux'

import ToolBar from './ToolBar';
//import StepField from './StepField';
import Diagram from './Diagram';

//import StatusPanel from './StatusPanel';
//import HistoryPanel from './HistoryPanel';
//import ConfigPanel from './ConfigPanel';

import SplitPane from './SplitPane';

import 'css/root';
import 'css/resizer';

const Root = ({ connected }) => {
  return (<div id="wrapper">
    <header><ToolBar /></header>
    { connected &&
      <section id="panel-wrapper">
        <SplitPane split="vertical" className="root-panel" defaultSize={400}>
          <Diagram />
          <div>B</div>
        </SplitPane>
      </section>
    }
  </div>);
}

function mapStateToProps(state) {
  return {
    connected: state.network.connected
  };
}

export default connect(mapStateToProps)(Root);
