import React, { Component } from 'react';

const Actor = ({ x, textY, lineStartY, lineEndY, fontSize = 12, klass, name}) => {
  return (<g className="actor">
    {/* Label for actor */}
    <text x={x} y={textY} textAnchor="middle" fill="black" fontSize={fontSize} fill="#000">
      {klass}
      <tspan x={x} y={textY + fontSize}>#{name}</tspan>
    </text>
    { /* timeline */}
    <line x1={x} x2={x}
          y1={lineStartY} y2={lineEndY}
          stroke="#000" strokeWidth="1" />
    <circle r="5"
            cx={x} cy={lineStartY}
            stroke="#000" fill="white" />
  </g>);
};

export default Actor;
