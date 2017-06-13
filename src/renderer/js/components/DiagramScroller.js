import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as uiActionCreator from '../actions/ui';

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
        scrollValue: state.ui.scrollValue,
        width: state.ui.panelSize
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(uiActionCreator, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DiagramScroller);
