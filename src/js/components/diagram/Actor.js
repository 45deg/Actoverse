import React, { Component } from 'react';

import randomColor from 'randomcolor';

const Actor = ({ x, textY, lineStartY, lineEndY, fontSize = 12, name, pid}) => {
  var color = randomColor({ luminosity: 'dark', seed:name });
  return (<g className="actor">
    {/* Label for actor */}
    <text x={x} y={textY} textAnchor="middle" fill="black" fontSize={fontSize} fill={color}>
      {name}
      <tspan x={x} y={textY + fontSize}>#{pid}</tspan>
    </text>
    { /* timeline */}
    <line x1={x} x2={x}
          y1={lineStartY} y2={lineEndY}
          stroke={color} strokeWidth="2" />
    <circle r="5"
            cx={x} cy={lineStartY} 
            stroke={color} fill="white" />
  </g>);
};

export default Actor;