import React from 'react';
import { connect } from 'react-redux'

import {initActor} from '../actions/vm';

const ToolBar = ({ code, submitCode }) => {
    var options = {
        mode: 'javascript',
        lineNumbers: true
    };
    return (<div className="toolbar-panel">
            <form id="execute" onSubmit={e => {e.preventDefault(); submitCode(code)}}>
                <input type="submit" value="Run" className="btn-submit" />
            </form>
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
        submitCode : (code) => {
            dispatch(initActor());
            (0,eval)(code);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);