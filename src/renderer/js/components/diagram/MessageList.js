import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from './Message';
//import CandidateMessage from './CandidateMessage';
import ElementArranger from './ElementArranger';
import generateColor from '../../helpers/generateColor';
import socket from '../../socket';

function processMessages(log, messagePool){
  var recvs = log.filter(m => m.type === 'consume');
  return log
    .filter(msg => msg.type === 'send')
    .map(sendMsg => {
      let recvMsg = recvs.find(m => m.uid === sendMsg.uid);
      let candidate = messagePool.has(sendMsg.uid);
      return {
        sendAt: sendMsg.time,
        recvAt: recvMsg ? recvMsg.time : null,
        body: sendMsg.body,
        candidate
      };
    });
}

const MessageList = ({ timeInterval, margin, messageLog, messagePool,
                        width, actors, messageFlag, clock }) => {
  return <ElementArranger>{
    processMessages(messageLog, messagePool)
      .map((msg, index) => {
        var xSpan = width / (actors.size + 1);
        var targetPid = msg.body.get('target');
        var senderPid = msg.body.get('sender');
        var targetIndex = actors.keySeq().findIndex(k => k === targetPid);
        var senderIndex = actors.keySeq().findIndex(k => k === senderPid);
        var msgData = msg.body.get('data').toJS();
        var props = {
          id: index,
          key: index,
          text: JSON.stringify(msgData),
          fromX: xSpan * (senderIndex + 1),
          fromY: msg.sendAt * timeInterval + margin,
          toX: xSpan * (targetIndex + 1),
          toY: msg.recvAt ? msg.recvAt * timeInterval + margin
                          : (clock + 1) * timeInterval + margin,
          className: ['log',
                      msg.candidate ? 'candidate' : '',
                      messageFlag ? '' : 'hide-message',
                      msg.recvAt ? '' : 'dash' ].join(' '),
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
    messagePool: state.shadow.messagePool,
    clock: state.shadow.clock,
    width: state.ui.panelSize['root-panel'],
    timeInterval: state.ui.timeInterval,
    messageFlag: state.ui.showMessage,
  };
}

export default connect(mapStateToProps)(MessageList);
