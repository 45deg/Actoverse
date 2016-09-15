import React from 'react'

import ToolBar from './ToolBar';
import Editor from './Editor';
import Page from './Page';
import Tab from './Tab';
import StepField from './StepField';
import Diagram from './Diagram';

import StatusPanel from './StatusPanel';
import HistoryPanel from './HistoryPanel';
import ConfigPanel from './ConfigPanel';

import SplitPane from './SplitPane';

import 'css/root';
import 'css/resizer';

class Root extends React.Component {
    render(){
        return (<div id="wrapper">
            <header><ToolBar /></header>
            <section id="panel-wrapper">
            <SplitPane split="vertical" className="root-panel" primary="second" defaultSize={400}>
                <SplitPane split="horizontal" className="editor-panel" defaultSize="70%">
                    <Editor />
                    <Tab id="debug-panel">
                        <Page label="Step"><StepField /></Page>
                        <Page label="Auto">not implemented</Page>
                    </Tab>
                </SplitPane>
                <SplitPane split="horizontal" className="vis-panel" defaultSize={500}>
                    <Diagram />
                    <Tab id="inspector">
                        <Page label="Status"><StatusPanel /></Page>
                        <Page label="History"><HistoryPanel /></Page>
                        <Page label="Config"><ConfigPanel /></Page>
                    </Tab>
                </SplitPane>
            </SplitPane>
            </section>
        </div>);
    }
}

export default Root;