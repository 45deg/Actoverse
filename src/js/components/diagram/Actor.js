import React, { Component } from 'react';

const Actor = ({ x, textY, lineStartY, lineEndY, fontSize = 12, text}) => {
  return (<g className="actor">
    {/* Label for actor */}
    <text x={x} y={textY} textAnchor="middle" fill="black" fontSize={fontSize}>{
      text.split("\n").map((line, ln) =>
        <tspan x={x} y={textY + fontSize * ln} key={ln}>{line}</tspan>
      )
    }</text>
    { /* timeline */}
    <line x1={x} x2={x}
          y1={lineStartY} y2={lineEndY}
          stroke="black" strokeWidth="3" />
    <circle r="5"
            cx={x} cy={lineStartY} 
            stroke="black" fill="white" />
  </g>);
};

export default Actor;