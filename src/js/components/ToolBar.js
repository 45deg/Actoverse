import React from 'react';
import { connect } from 'react-redux'
import { Button, Glyphicon } from 'react-bootstrap';

import {initActor} from '../actions/vm';

import 'css/toolbar';

const ToolBar = ({ submitCode }) => {
    return (<div className="toolbar-panel">
              <Button onClick={submitCode} bsStyle="primary" bsSize="large"><Glyphicon glyph="play" /> Run</Button>
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
            (0,eval)(code);
        }
    }
}
function mergeProps(stateProps, dispatchProps) {
  return { submitCode : () => dispatchProps.submitCode(stateProps.code) };
}


export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ToolBar);