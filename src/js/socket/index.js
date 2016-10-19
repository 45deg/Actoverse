import store from '../store';
import { showAlertModal } from '../actions/modal';
import { disconnectNetwork } from '../actions/network';

class SocketManager {
  constructor(){
    this.socket = null;
    this.preparedToClose = false;
  }
  connect(url){
    return new Promise((resolve, reject) => {
      if(this.socket !== null) this.close();
      this.socket = new WebSocket('ws://' + url);
      this.socket.onopen = () => {
        resolve();
        this._onOpen();
      };
      this.socket.onclose = this._onClose.bind(this);
      this.socket.onerror = (err) => {
        reject(err);
        this._onError();
      };
      this.socket.onmessage = this._onMessage.bind(this);
    });
  }
  _onOpen(){
    console.log('connected');
    this.send({ type: 'report' });
  }
  _onClose(){
    // reconnect
    if(!this.preparedToClose) {
      store.dispatch(showAlertModal("Connection lost."));
      store.dispatch(disconnectNetwork());
    }
    this.preparedToClose = false;
  }
  _onError(){
    store.dispatch(showAlertModal("Error while connection."));
  }
  _onMessage(dataMsg) {
    var data = JSON.parse(dataMsg.data);
    console.log('<IN<', dataMsg.data);
    if(data.event === 'REPORT_STATE') {
      store.dispatch({
        type: 'INIT_STATE',
        body: data.body,
        pid: data.pid
      });
    }
/*
    if(data.event === 'REPORT_STATE') {
      for(let pid in data.body) {
        if(data.body[pid].mailbox.length > 0)
          this.send(Object.assign({type: 'select'}, data.body[pid].mailbox[0]));
      }
      return;
    } else if(data.event === 'QUEUE_RECEIVED') {
      setTimeout(() => this.send(Object.assign({type: 'select'}, data.body)), 1000);
      console.log('>OUT> [SELECT]', data.body);
    } */
    store.dispatch({
      type: data.event,
      body: data.body,
      pid: data.pid
    });
  };

  send(data){
    this.socket.send(JSON.stringify(data));
  }
  close(){
    this.preparedToClose = true;
    this.socket.close();
  }
}

const socketMangaer = new SocketManager();
export default socketMangaer;
