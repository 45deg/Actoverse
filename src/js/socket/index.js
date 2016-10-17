import store from '../store';

class SocketManager {
  constructor(){
    this.socket = null;
  }
  connect(url){
    this.socket = new WebSocket(url);
    this.socket.onopen = this._onOpen.bind(this);
    this.socket.onclose = this._onClose.bind(this);
    this.socket.onmessage = this._onMessage.bind(this);
  }
  _onOpen(){
    console.log('connected');
    send({ type: 'report' });
  }
  _onClose(){
    // reconnect
  }
  _onError(){
    // send error
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
      return;
    }
    /*
    if(data.event === 'REPORT_STATE') {
      for(let pid in data.body) {
        if(data.body[pid].mailbox.length > 0)
          this.send(Object.assign({type: 'select'}, data.body[pid].mailbox[0]));
      }
      return;
    } else if(data.event === 'QUEUE_RECEIVED') {
      setTimeout(() => send(Object.assign({type: 'select'}, data.body)), 1000);
      console.log('>OUT> [SELECT]', data.body);
    }
    */
    store.dispatch({
      type: data.event,
      body: data.body,
      pid: data.pid
    });
  };

  send(data){
    this.socket.send(JSON.stringify(data));
  }
}

const socketMangaer = new SocketManager();
export default socketMangaer;
