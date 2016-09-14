import React, { Component } from 'react';
const Message = ({ fromX, fromY, toX, toY, className, text, id,
    onClick, onMouseOver }) => {
  return (<g className={className} onClick={onClick} onMouseOver={onMouseOver}>
    <path id={'path-' + id} d={`M ${fromX}, ${fromY} L ${toX}, ${toY}`} strokeWidth="2" />
    <text
      stroke="#FFFFFF" strokeWidth="2px"
      fontSize="12"
      dy="-3"
      paintOrder="stroke"
      textAnchor="middle"
      transform={ // flip text
        fromX > toX ? `rotate(180 ${(fromX + toX) / 2} ${(fromY + toY) / 2})`
                    : 'rotate(0)'
      }>
      <textPath startOffset="50%" xlinkHref={'#path-' + id}>{text}</textPath>
    </text>
  </g>);
};

export default Message;