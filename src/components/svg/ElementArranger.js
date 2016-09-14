import React, { Component } from 'react';
import { connect } from 'react-redux';
import { moveToFront } from '../../actions/diagram';

const ElementArranger = ({ front, moveToFront, children }) => {
  var newChildren = children.concat();
  console.log(front);
  if (front >= 0) {
    newChildren.push(newChildren.splice(front, 1)[0]);
  }
  return <g>{
    newChildren.map((child, index) =>
      React.cloneElement(child, {
        onMouseOver: () => { moveToFront(index) },
        style: { opacity: 0.8 }
      })
    )
  }</g>;
};

function mapStateToProps(state) {
  return {
    front: state.diagram.frontElementIndex
  };
}

function mapDispatchToProps(dispatch) {
  return {
    moveToFront: id => dispatch(moveToFront(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ElementArranger);