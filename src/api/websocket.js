/**
 * websocket封装
 * @function conncet 连接数据
 * @function send 发送数据
 * @function close 关闭连接
 * @function isConnect 查看WS是否连接
 */
class WS {
  constructor() {
    this.ws = null;
    this.readyState = 0;
  }
  init(url, payload, onError) {
    return new Promise((resolve, reject) => {
      try {
        if (!this.ws) {
          this.ws = new WebSocket(`${url}/${payload}`);
        }
        this.ws.onopen = () => {
          this.readyState = this.ws.readyState;
          resolve(this.readyState);
        };
        this.ws.onerror = error => {
          onError && onError(error);
          reject(error);
        };
      } catch (error) {
        reject(error);
      }
    });
    // );
  }
  connect(url, payload, onMessage, onError, onClose) {
    return new Promise((resolve, reject) => {
      this.init(url, payload, onMessage, onError).then(res => {
        if (res === this.ws.OPEN) {
          this.ws.onmessage = event => {
            const message = JSON.parse(event.data);
            onMessage && onMessage(message);
          };
          this.ws.onclose = (event => {
            this.ws = null;
            onClose && onClose(event.data);
          });
          resolve(res);
        } else {
          reject(res);
        }
      }).catch(error => { reject(error); });
    });
  }
  send(msg) {
    this.ws.send(JSON.stringify(msg));
  }
  close() {
    // console.log(this.ws);
    this.ws && this.ws.close();
  }
  isConnect() {
    if (this.ws) return true;
    return false;
  }
}

export default new WS();
