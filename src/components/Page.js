import React, { Component } from 'react';

export default class Page extends Component {
    render() {
        return (
            <div className="tab-page">
                {this.props.children}
            </div>
        );
    }
}