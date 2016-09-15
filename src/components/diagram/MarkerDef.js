import React, { Component } from 'react';

export default class MarkerDef extends Component {
    render() {
        return (
            <marker
              id={this.props.id}
              viewBox="0 0 10 10" 
              refX="13" 
              refY="5"
              orient="auto" 
              markerWidth="6" 
              markerHeight="6"
              markerUnits="strokeWidth">
                <path d="M 0 0 L 10 5 L 0 10 z" fill={this.props.color}></path>
            </marker>
        );
    }
}