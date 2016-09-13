import React from 'react';
import { connect } from 'react-redux'

import brace from 'brace';
import AceEditor from 'react-ace';

import {setCode} from '../actions/code';
import {initActor} from '../actions/vm';

import 'brace/mode/javascript';
import 'brace/theme/github';

const Editor = ({ code, onChange, onSubmit }) => {
    var options = {
        mode: 'javascript',
        lineNumbers: true
    };
    return (<div className="editor-panel">
        <div className="toolbar-panel">
            <form id="execute" onSubmit={e => {e.preventDefault(); onSubmit(code)}}>
                <input type="submit" value="Run" className="btn-submit" />
            </form>
        </div>
        <div id="editor">
            <AceEditor
                fontSize={14}
                value={code}
                onChange={onChange}
                mode="javascript"
                theme="github" />
        </div>
    </div>);
};

// separate this file 

function mapStateToProps(state) {
    return {
        code: state.code.toString()
    };
}
function mapDispatchToProps(dispatch, ownProps) {
    return {
        onChange : (code) => dispatch(setCode(code)),
        onSubmit : (code) => {
            dispatch(initActor());
            (0,eval)(code);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);