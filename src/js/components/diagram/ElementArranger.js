import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as diagramActionCreator from '../../actions/diagram';

const ElementArranger = ({ frontKey, moveToFront, children }) => {
  var newChildren = children.concat();
  var frontIndex = newChildren.findIndex(e => e.key === frontKey);
  if (frontIndex >= 0) {
    newChildren.push(newChildren.splice(frontIndex, 1)[0]); // pop to front
  }
  return <g>{
    newChildren.map((child) =>
      React.cloneElement(child, {
        onMouseOver: () => moveToFront(child.key)
      })
    )
  }</g>;
};

function mapStateToProps(state) {
  return {
    frontKey: state.diagram.frontElementIndex
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(diagramActionCreator, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ElementArranger);