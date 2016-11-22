import React from 'react';
import { connect } from 'react-redux'
import { Tabs, Tab } from 'react-bootstrap';

import ToolBar from './ToolBar';
import Diagram from './Diagram';
import SplitPane from './SplitPane';

import StatePanel from './panels/StatePanel';
import CensorshipPanel from './panels/CensorshipPanel';
import LogPanel from './panels/LogPanel';

import AlertModal from './AlertModal';

import 'css/root';
import 'css/resizer';

const Root = ({ connected }) => {
  return (<div id="wrapper">
    <header><ToolBar /></header>
    { connected &&
      <section id="panel-wrapper">
        <SplitPane split="vertical" className="root-panel" defaultSize={400}>
          <Diagram />
          <Tabs defaultActiveKey={1} id="panel-tab">
            <Tab eventKey={1} title="State"><StatePanel /></Tab>
            <Tab eventKey={2} title="Censorship"><CensorshipPanel /></Tab>
            <Tab eventKey={3} title="Log"><LogPanel /></Tab>
          </Tabs>
        </SplitPane>
      </section>
    }
    <AlertModal />
  </div>);
}

function mapStateToProps(state) {
  return {
    connected: state.network.connected
  };
}

export default connect(mapStateToProps)(Root);
