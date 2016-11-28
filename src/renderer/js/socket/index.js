import store from '../store';
import { showAlertModal, hideAlertModal } from '../actions/modal';
import { disconnectNetwork } from '../actions/network';
import { initState } from '../actions/shadow';

class SocketManager {
  constructor(){
    this.socket = null;
    this.preparedToClose = false;
    this.currentTarget = null;
  }
  connect(url){
    this.currentTarget = url;
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
    this.send({ type: 'dump_log' });
    this.send({ type: 'export_filters' });
  }
  _onClose(){
    // reconnect
    let reconnect = store.getState().network.reconnect;
    if(!this.preparedToClose) {
      store.dispatch(showAlertModal("Connection lost."
                                    + (reconnect ? ' Reconnecting...' : '')));
      store.dispatch(disconnectNetwork());
      if(reconnect){
        let connect = this.connect.bind(this);
        let target = this.currentTarget;
        let retry = () => {
          connect(target).then(() => {
            store.dispatch({ type: 'CONNECT_NETWORK', target });
            store.dispatch(hideAlertModal());
          });
        }
        setTimeout(retry, 1000);
      }
    }
    this.preparedToClose = false;
    this.socket = null;
  }
  _onError(){
    store.dispatch(showAlertModal("Error while connection."));
  }
  _onMessage(dataMsg) {
    var data = JSON.parse(dataMsg.data);
    console.log('<IN<', dataMsg.data);
    if(data.event === 'DUMP_LOG') {
      store.dispatch(initState());
      for(let name in data.body) {
        let log = data.body[name];
        for(let entry of log) {
          store.dispatch({
            ...entry,
            type: entry.event,
            name: name,
          });
        }
      }
    } else {
      store.dispatch({
        ...data,
        type: data.event,
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
