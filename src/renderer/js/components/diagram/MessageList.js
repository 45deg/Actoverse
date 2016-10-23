import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from './Message';
//import CandidateMessage from './CandidateMessage';
import ElementArranger from './ElementArranger';
import generateColor from '../../helpers/generateColor';
import socket from '../../socket';

function processMessages(log){
  var sends = log.filter(m => m.type === 'send');
  return log
    .filter(msg => msg.type === 'consume')
    .map(msg => {
      let sendMsg = sends.find(m => m.uid === msg.uid);
      return {
        sendAt: sendMsg ? sendMsg.time : 0,
        recvAt: msg.time,
        body: msg.body
      };
    });
}

function getCandidates(actors, log, clock){
  var sends = log.filter(m => m.type === 'send');
  return [];
  return actors.flatMap(actor => actor.get('mailbox'))
               .map(msg => {
                 let sendMsg = sends.find(m => m.body.equals(msg));
                 return {
                   sendAt: sendMsg ? sendMsg.time : 0,
                   recvAt: clock + 1,
                   body: msg,
                   candidate: true,
                 }
               }).toArray();
}

const MessageList = ({ timeInterval, margin, messageLog,
                        width, actors, messageFlag, clock }) => {
  return <ElementArranger>{
    processMessages(messageLog)
      .concat(getCandidates(actors, messageLog, clock))
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
        if (msg.candidate) {
          props.onClick = (body => () => {
            socket.send({
              type: 'select',
              ...body
            })
          })(msg.body.toJS());
          return <Message {...props} />;
        } else {
          return <Message {...props} />;
        }
      })
  }</ElementArranger>;
}
function mapStateToProps(state) {
  return {
    actors: state.shadow.actors,
    messageLog: state.shadow.messageLog,
    clock: state.shadow.clock,
    width: state.ui.panelSize['root-panel'],
    timeInterval: state.ui.timeInterval,
    messageFlag: state.ui.showMessage,
  };
}

export default connect(mapStateToProps)(MessageList);
