import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from './Message';
import CandidateMessage from './CandidateMessage';
import ElementArranger from './ElementArranger';
import generateColor from '../../helpers/generateColor';

function processMessages(log){
  var sends = log.filter(m => m.type === 'send');
  return log
    .filter(msg => msg.type === 'consume')
    .map(msg => {
      let sendMsg = sends.find(m => m.body.equals(msg.body));
      return {
        sendAt: sendMsg ? sendMsg.time : 0,
        recvAt: msg.time,
        body: msg.body
      };
    });
}

const MessageList = ({ timeInterval, margin, messageLog, width, actors, messageFlag }) => {
  return <ElementArranger>{
    processMessages(messageLog)
      //.concat([]) //messageQueue.map((m, i) => ({ ...m, candidate: true })))
      .map((msg, index) => {
        var xSpan = width / (actors.size + 1);
        var targetPid = msg.body.get('target');
        var senderPid = msg.body.get('sender');
        var targetIndex = actors.findKey(entry => entry.get('pid') === targetPid) + 1 || 0;
        var senderIndex = actors.findKey(entry => entry.get('pid') === senderPid) + 1 || 0;
        var msgData = msg.body.get('data').toJS();
        var props = {
          id: index,
          key: index,
          text: JSON.stringify(msgData),
          fromX: xSpan * senderIndex,
          fromY: msg.sendAt * timeInterval + margin,
          toX: xSpan * targetIndex,
          toY: msg.recvAt * timeInterval + margin,
          className: ['log',
                      msg.candidate ? 'candidate' : '',
                      messageFlag ? '' : 'hide-message',
                      msg.discard ? 'discard' : '' ].join(' '),
          color: generateColor(msgData[0])
        };
        if (msg.candidate)
          return <CandidateMessage {...props} />;
        else
          return <Message {...props} />;
      })
  }</ElementArranger>;
}
function mapStateToProps(state) {
  return {
    actors: state.shadow.actors,
    messageLog: state.shadow.messageLog,
    width: state.panels['root-panel'],
    timeInterval: state.diagram.timeInterval,
    messageFlag: state.diagram.showMessage,
  };
}

export default connect(mapStateToProps)(MessageList);
