import store from '../store';
import { showAlertModal } from '../actions/modal';
import { disconnectNetwork } from '../actions/network';
import { initState } from '../actions/shadow';

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
    store.dispatch(initState());
    this.send({ type: 'dump_log' });
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
    if(data.event === 'DUMP_LOG') {
      for(let entry of data.body) {
        store.dispatch({
          type: entry.event,
          body: entry.body,
          pid: entry.pid
        });
      }
    } else {
      store.dispatch({
        type: data.event,
        body: data.body,
        pid: data.pid
      });
    }
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