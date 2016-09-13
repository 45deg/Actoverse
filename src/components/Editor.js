import React from 'react';
import { connect } from 'react-redux'

import brace from 'brace';
import AceEditor from 'react-ace';

import {setCode} from '../actions/code';
import 'brace/mode/javascript';
import 'brace/theme/github';

const Editor = ({ code, onChange }) => {
    var options = {
        mode: 'javascript',
        lineNumbers: true
    };
    return (<AceEditor
                fontSize={14}
                value={code}
                onChange={onChange}
                onLoad={editor => window.editor = editor}
                mode="javascript"
                theme="github" />);
};

// separate this file 

function mapStateToProps(state) {
    return {
        code: state.code.toString()
    };
}
function mapDispatchToProps(dispatch, ownProps) {
    return {
        onChange : (code) => dispatch(setCode(code))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);