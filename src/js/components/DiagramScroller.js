import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as diagramActionCreator from '../actions/diagram';

class DiagramScroller extends Component {
    render() {
        var {width, scrollTo} = this.props;
        return (<div id="canvas" style={{width}} onScroll={() => scrollTo(ReactDOM.findDOMNode(this).scrollTop)}>
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
        width: state.panels['root-panel']
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(diagramActionCreator, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DiagramScroller);
