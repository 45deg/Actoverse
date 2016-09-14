import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import MarkerDef from './svg/MarkerDef';
import Actor from './svg/Actor';
import Message from './svg/Message';
import CandidateMessage from './svg/CandidateMessage';
import PointList from './svg/PointList';
import ElementArranger from './svg/ElementArranger';
import DiagramScroller from './DiagramScroller';

import {stepActor, backActor} from '../actions/vm';

const CONFIG = {
    margin: 40,
    timeSpan: 50
}

// Hell, there are bullshit paramerters
// I must fix it <- did it.

class Diagram extends Component {
    render() {
        var {actors, messageLog, messageQueue, frontIndex, width, height} = this.props;
        var {margin} = CONFIG;
        var timeSpan = width / 8;
        return (<DiagramScroller>
            <svg width="100%" height={(messageLog.length + 1) * timeSpan + margin + 10}>
              {
                actors.map((actor, i) => 
                  <Actor x={width / actors.length * actor.pid}
                         textY={18}
                         lineStartY={actor._up * timeSpan + margin}
                         lineEndY={actor._down ? actor._down * timeSpan + margin
                                               : (messageLog.length + 1) * timeSpan + margin}
                         text={actor.constructor.name + "\n#" + actor.pid} 
                         key={i} />
                )
              }

              <ElementArranger>
              {
                /* this is a little bloated so should be separated from Diagram */
                messageLog
                .concat(messageQueue.map((m, i) => 
                  Object.assign({}, m, {candidate: true, originalIndex: i }))
                )
                .map((msg, index) => { 
                  var xSpan = width / actors.length;
                  var props = {
                    fromX : xSpan * msg.from,
                    fromY : msg.timestamp * timeSpan + margin,
                    toX : xSpan * msg.to,
                    toY : msg.candidate ? (messageLog.length + 1) * timeSpan + margin
                                          : (index + 1) * timeSpan + margin,
                    className : msg.candidate ? 'candidate' : 'log',
                  };
                  if(msg.candidate)
                    return <CandidateMessage {...props} id={msg.uid} index={msg.originalIndex} key={msg.uid} text={JSON.stringify(msg.data)} />;
                  else
                    return <Message {...props} id={msg.uid} key={msg.uid} text={JSON.stringify(msg.data)} />;
                })
              }
              </ElementArranger>
              <PointList timeSpan={timeSpan} margin={margin} />
              <defs>
                <MarkerDef color="#000" id="arrowhead-normal" />
                <MarkerDef color="#F00" id="arrowhead-hover" />
                <MarkerDef color="#777" id="arrowhead-candidate" />
              </defs>
            </svg>
       </DiagramScroller>);
    }
}

function mapStateToProps(state) {
    return {
        actors: state.vm.actors,
        messageLog: state.vm.messageLog,
        messageQueue: state.vm.messageQueue,
        width: state.panels['root-panel']
    };
}

export default connect(mapStateToProps)(Diagram);