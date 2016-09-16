import React from 'react';
import { connect } from 'react-redux'

import brace from 'brace';
import AceEditor from 'react-ace';

import {setCode, setEditor} from '../actions/editor';
import 'brace/mode/javascript';
import 'brace/theme/github';

import 'css/editor';

class Editor extends React.Component {
    render() {
        var { code, setEditor, setCode, editor} = this.props;
        var options = {
            mode: 'javascript',
            lineNumbers: true
        };
        if(editor !== null) {
            editor.resize();
        }
        return (<AceEditor
                    fontSize={14}
                    value={code}
                    onChange={setCode}
                    onLoad={setEditor}
                    mode="javascript"
                    theme="github" />);
    }

    componentDidMount(){
        fetch(new Request('examples/two-phase-commit.js'))
            .then(resp => resp.text())
            .then(text => this.props.setCode(text));
    }
};

// separate this file 

function mapStateToProps(state) {
    return {
        size:   state.panels['editor-panel'],
        code:   state.editor.code,
        editor: state.editor.editor,
    };
}
function mapDispatchToProps(dispatch, ownProps) {
    return {
        setCode : (code) => dispatch(setCode(code)),
        setEditor : (editor) => dispatch(setEditor(editor))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);