/*
 * @Description:
 * @Author: chenxch
 * @Date: 2021-05-23 18:39:11
 */
const ws = require('nodejs-websocket');
// const protobufjs = require('protobufjs');
const root = require('../proto/protoNode');
const { MessageRequest, MessageResponse } = root;
const PORT = 18080;
const dayjs = require('dayjs');

//创建server,每次只要有用户连接，回调执行就会给用户创建一个connect对象
const server = ws.createServer((connect) => {
  console.log('用户连接成功');
  //binary
  connect.on('binary', (inStream) => {
    console.log(`接受到用户的数据:${inStream}`);
    let data;
    inStream.on('readable', function () {
      data = inStream.read();
    });
    inStream.on('end', function () {
      console.log('Received ' + data.length + ' bytes of binary data');
      //解析接收的数据,cmd
      var cmd = data.readUInt16BE(0);
      console.log('接收数据的cmd:', cmd);
      let bytes = Buffer.from(data, 1);
      //解析接收的数据,loginReq
      var req = MessageRequest.decode(bytes);
      console.log('接收数据的uid:', req.name);
      //发送的数据,loginReq
      var rep = MessageResponse.create();
      rep.name = req.name;
      rep.msg = req.msg;
      rep.time = dayjs().format('YYYY-MM-DD hh:mm:ss');
      rep.code = 200;
      var sendData = MessageResponse.encode(rep).finish();
      //发送的数据,cmd
      var sendBuffer = Buffer.alloc(2);
      sendBuffer.writeInt16BE(100);
      //拼接数据并发送
      var totalBuffer = Buffer.concat(
        [sendBuffer, sendData],
        sendData.length + sendBuffer.length
      );
      connect.sendBinary(totalBuffer);
    });
    //接受到数据后给用户响应数据
    // connect.sendText(data);
  });

  //连接关闭触发close事件
  connect.on('close', () => {
    console.log('连接断开');
  });

  //注册error事件,用户端口后就会触发该异常
  connect.on('error', () => {
    console.log('用户连接异常');
  });
});

server.listen(PORT, () => {
  console.log('监听3000');
});
