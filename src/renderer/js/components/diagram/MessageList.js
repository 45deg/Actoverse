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
  let entireLog = logs.valueSeq().flatten(true);
  return entireLog.groupBy(entry => entry.get('body').get('uid'))
   .map((pair, uid) => {
     let sendEntry = pair.find(e => e.get('type') === 'send');
     let recvEntry = pair.find(e => e.get('type') === 'receive');
     let msgBody = pair.first().get('body');
     return {
       sendAt: sendEntry ? sendEntry.get('timestamp')
                         : recvEntry.get('timestamp') - 1,
       recvAt: recvEntry ? recvEntry.get('timestamp') : null,
       body: msgBody,
       candidate: !!messagePool.find(msg => uid == msg.get('uid'))
     };
   }).valueSeq();
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
                          : clock * timeInterval + margin,
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
