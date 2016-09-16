import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as diagramActionCreator from '../actions/diagram';

class DiagramScroller extends Component {
    render() {
        var {width, height, scrollTo} = this.props;
        return (<div id="canvas" style={{height, width}} onScroll={() => scrollTo(ReactDOM.findDOMNode(this).scrollTop)}>
            {this.props.children}
        </div>);
    }
    componentDidUpdate() {
      var node = ReactDOM.findDOMNode(this);
      node.scrollTop = this.props.scrollValue;
    }
}

function mapStateToProps(state) {
    return {
        scrollValue: state.diagram.scrollValue,
        width: state.panels['root-panel'],
        height: state.panels['vis-panel']
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(diagramActionCreator, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DiagramScroller);