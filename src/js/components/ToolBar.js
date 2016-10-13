import React from 'react';
import { connect } from 'react-redux'

import { Button, Glyphicon } from 'react-bootstrap';
import {initActor} from '../actions/shadow';

import 'css/toolbar';

const ToolBar = ({ submitCode }) => {
    return (<div className="toolbar-panel">
              <Button bsStyle="primary" bsSize="large"><Glyphicon glyph="play" /> Run</Button>
            </div>);
};

export default ToolBar;
