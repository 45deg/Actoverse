import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import * as editorActionCreator from '../actions/editor';
import examples from '../../../examples/index.json';

import 'whatwg-fetch';

class ExampleSelector extends React.Component {
    render() {
        return <DropdownButton title="Sample Code" id="example-selector">{
            examples.map((ex, i) => <MenuItem key={i} eventKey={ex.path} onSelect={this.fetchScript.bind(this)} >{ex.name}</MenuItem>)
        }</DropdownButton>
    }

    fetchScript(path) {
        var setCode = this.props.setCode;
        setCode("Loading...");
        fetch(new Request(path))
            .then(resp => resp.text())
            .then(text => setCode(text))
            .catch((e) => setCode(`Can't load a script: ${e.message}`));
    }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(editorActionCreator, dispatch);
}
export default connect(null, mapDispatchToProps)(ExampleSelector);