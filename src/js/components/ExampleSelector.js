import React from 'react';
import { connect } from 'react-redux'

import { DropdownButton, MenuItem } from 'react-bootstrap';

class ExampleSelector extends React.Component {
    render() {
        return <DropdownButton title={Examples} id="example-selector">
        </DropdownButton>
    }
/*
    componentDidMount(){
        fetch(new Request('examples/two-phase-commit.js'))
            .then(resp => resp.text())
            .then(text => this.props.setCode(text));
    }*/
};