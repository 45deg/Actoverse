import React from 'react';
import Editor from './Editor';
import Page from './Page';
import Tab from './Tab';
import StepField from './StepField';
import Diagram from './Diagram';
import StatusPanel from './StatusPanel';
import HistoryPanel from './HistoryPanel';
import ToolTip from './ToolTip';

class Root extends React.Component {
    render(){
        return (<div>
            <div className="main-panel">
                <Editor />
                <Tab className="debug-panel">
                    <Page label="Step"><StepField /></Page>
                    <Page label="Auto">not implemented</Page>
                </Tab>
            </div>
            <div className="vis-panel">
                <h2>Network</h2>
                <div id="canvas"><Diagram /></div>
                <Tab className="inspector">
                    <Page label="Status"><StatusPanel /></Page>
                    <Page label="History"><HistoryPanel /></Page>
                </Tab>
            </div>
            <ToolTip />
        </div>);
    }
}

export default Root;