<!--
 * @Description: 
 * @Author: chenxch
 * @Date: 2021-05-18 16:41:32
-->
<template>
  <div class="main">
    <div class="talk__content">
      <div v-for="(msg, index) in msgList" :key="index">
        <message-info :msg="msg" :self="msg.name === user"></message-info>
      </div>
    </div>
    <div class="talk__send">
      <a-mentions autofocus v-model:value="value" @select="onSelect" rows="4">
        <a-mentions-option
          :value="mentions.value"
          v-for="mentions in mentionsList"
          :key="mentions"
          >{{ mentions.key }}</a-mentions-option
        >
      </a-mentions>
    </div>
    <a-button type="primary" @click="send"> 发送 </a-button>
  </div>
</template>

<script setup>
import WebsocketHeartbeatJs from 'websocket-heartbeat-js';
import { ref, reactive, defineComponent, watch, onMounted } from 'vue';
import WS from '../api/websocket';
import root from '../proto/proto.js';
import protobuf from 'protobufjs';

const { MessageRequest, MessageResponse } = root;
console.log(MessageRequest);
const messageRequest = MessageRequest.create({
  name: 'xc',
  code: 200,
  msg: 'xc',
});
console.log(MessageRequest.encode(messageRequest).finish());
import MessageInfo from './MessageInfo.vue';

const value = ref('@您好');
const msgList = reactive([]);
const user = ref('kf');
const mentionsList = reactive([]);
msgList.push({ name: 'xc', msg: 'hello', time: '20201-05-19 00:00:00' });
msgList.push({
  name: 'kf',
  msg: '您好,工号9527为您服务',
  time: '20201-05-19 00:00:00',
});
msgList.push({
  name: 'xc',
  msg: '为啥我充值还没到账',
  time: '20201-05-19 00:00:00',
});
mentionsList.push({ key: '您好', value: '您好,工号9527为您服务' });
mentionsList.push({
  key: '充值',
  value:
    '充值不到账的原因和处理方式如下：【方式一】可能存在系统繁忙（如月初、月底交费高峰期等）延迟到账，请您留意24小时内的到账情况；【方式二】如超过24小时不到账，请您保存好您的充值凭证或充值卡卡体，联系对应充值渠道核查处理。',
  time: '20201-05-19 00:00:00',
});
watch(value, () => {
  console.log('value', value);
});
const onSelect = (option) => {
  console.log('select', option);
};

let ws;

const init = () => {
  ws = new WebSocket('ws://127.0.0.1:18080');
  // ws = new WebsocketHeartbeatJs({ url: 'ws://127.0.0.1:18080' });
  // 这个地方特别重要，websocket默认是Uint8array
  ws.binaryType = 'arraybuffer';
  ws.onclose = close;
  ws.onerror = onError;
  ws.onopen = open;
  ws.onmessage = message;
  console.log(ws);
};
const open = () => {
  console.log('连接成功');
};
const message = (evt) => {
  console.log('收到消息');
  const buf = protobuf.util.newBuffer(evt.data);
  // decode响应体
  const decodedResponse = MessageResponse.decode(buf);
  console.log(decodedResponse);
  msgList.push({ ...decodedResponse });
};

const close = () => {
  //关闭
  console.log('断开连接');
};

const onError = () => {
  console.log('连接异常');
};
const send = () => {
  const messageRequest = MessageRequest.create({
    name: user.value,
    code: 200,
    msg: value.value,
  });
  console.log(messageRequest);
  ws.send(MessageRequest.encode(messageRequest).finish());
  value.value = null;
};
onMounted(() => {
  init();
});
</script>
<style lang="less" scoped>
.main {
  height: 100%;
  width: 800px;
  text-align: left;
  margin: 0 auto;
}
.talk {
  &__content {
    height: 350px;
    overflow-y: auto;
    padding: 10px;
    border: 1px solid #e0e0e0;
  }
  &__send {
    // height: 105px;
  }
  &__mentions {
    // height: 100px;
  }
}
// .msg__text {
//   display: inline-block;
//   margin-left: 10px;
// }
</style>
