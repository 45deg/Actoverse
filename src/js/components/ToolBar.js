import React from 'react';
import { connect } from 'react-redux'

import { Button, Glyphicon } from 'react-bootstrap';
import ExampleSelector from './ExampleSelector';

import { transform } from 'babel-standalone';

import {initActor} from '../actions/shadow';

import 'css/toolbar';

const ToolBar = ({ submitCode }) => {
    return (<div className="toolbar-panel">
              <Button onClick={submitCode} bsStyle="primary" bsSize="large"><Glyphicon glyph="play" /> Run</Button>
              <ExampleSelector />
            </div>);
};

// separate this file 

function mapStateToProps(state) {
    return {
        code: state.editor.code
    };
}
function mapDispatchToProps(dispatch, ownProps) {
    return {
        submitCode : (code) => {
            dispatch(initActor());
            var babelifiedCode = transform(code, { presets: ['es2015'] }).code;
            try {
                eval(babelifiedCode);
            } catch(e) {
                let err = "An error occurred while evaluating the code.";
                err += "\\n\\n[Message] " + e;
                alert(err);
            }
        }
    }
}
function mergeProps(stateProps, dispatchProps) {
  return { submitCode : () => dispatchProps.submitCode(stateProps.code) };
}


export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ToolBar);