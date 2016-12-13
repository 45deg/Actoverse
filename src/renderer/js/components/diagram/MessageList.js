import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from './Message';
//import CandidateMessage from './CandidateMessage';
import ElementArranger from './ElementArranger';
import generateColor from '../../helpers/generateColor';
import socket from '../../socket';
import Immutable from 'immutable';
import { toJSON } from '../../helpers/util'

function processMessages(logs, messagePool){
  return logs.valueSeq().flatMap(log => {
    let sends = log.filter(m => m.get('type') === 'send');
    return sends.map(sendMsg => {
      let msgBody = sendMsg.get('body');
      let recvMsg = logs.get(msgBody.get('target'), Immutable.List())
                        .filter(m => m.get('type') == 'receive')
                        .map(m => m.get('body'))
                        .find(recv => recv.get('uid') == msgBody.get('uid'));
      return {
        sendAt: sendMsg.get('timestamp') ,
        recvAt: recvMsg ? recvMsg.get('timestamp') : null,
        body:   msgBody,
        candidate: !!messagePool.find(msg => msgBody.get('sender') === msg.get('sender') &&
                                             msgBody.get('uid') === msg.get('uid'))
      };
    });
  });
}

const MessageList = ({ timeInterval, margin, messageLogs, messagePool,
                        width, actors, messageFlag, clock }) => {
  return <ElementArranger>{
    processMessages(messageLogs, messagePool)
      .map((msg, index) => {
        var xSpan = width / (actors.size + 1);
        var targetPid = msg.body.get('target');
        var senderPid = msg.body.get('sender');
        var targetIndex = actors.keySeq().findIndex(k => k === targetPid);
        var senderIndex = actors.keySeq().findIndex(k => k === senderPid);
        var msgData = msg.body.get('data');
        var props = {
          id: index,
          key: index,
          text: toJSON(msgData),
          fromX: xSpan * (senderIndex + 1),
          fromY: msg.sendAt * timeInterval + margin,
          toX: xSpan * (targetIndex + 1),
          toY: msg.recvAt ? msg.recvAt * timeInterval + margin
                          : (clock + 1) * timeInterval + margin,
          className: ['log',
                      msg.candidate ? 'candidate' : '',
                      messageFlag ? '' : 'hide-message',
                      msg.recvAt ? '' : 'dash' ].join(' '),
          color: generateColor(msgData[0]) // FIXIT
        };
        if (msg.candidate) {
          props.onClick = (body => () => {
            socket.send({
              type: 'select',
              //sender: body.sender,
              uid: body.get('uid')
            })
          })(msg.body);
          return <Message {...props} />;
        } else {
          return <Message {...props} />;
        }
      })
      .toArray() // Immutable Object -> raw array
  }</ElementArranger>;
}
function mapStateToProps(state) {
  return {
    actors: state.shadow.actors,
    messageLogs: state.shadow.messageLogs,
    messagePool: state.shadow.messagePool,
    clock: state.shadow.clock,
    width: state.ui.panelSize['root-panel'],
    timeInterval: state.ui.timeInterval,
    messageFlag: state.ui.showMessage,
  };
}

export default connect(mapStateToProps)(MessageList);
