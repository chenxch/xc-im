<!--
 * @Description: 
 * @Author: chenxch
 * @Date: 2021-05-19 10:21:14
-->
<template>
  <div class="msg" :class="self?'self':''">
    <a-avatar class="msg__icon">
      <template #icon><UserOutlined /></template>
    </a-avatar>
    <div class="msg__text">{{msg.msg}}</div>
  </div>
</template>

<script setup>
import UserOutlined from '@ant-design/icons-vue/UserOutlined';

import { ref,defineProps } from 'vue'
defineProps({
    self: {
      type: Boolean,
      require: false,
      default: () => false
    },
    msg: {
      type: Object,
      require: true,
      default: () => {}
    }
  })
</script>
<style lang="less" scoped>
.msg{
  margin: 10px 0 0 10px;
  &__icon {
    vertical-align: top;
  }
  &__text {
    display: inline-block;
    position: relative;
    max-width: 250px;
    min-height: 25px;
    background: #ccc;
    border-radius: 5px;
    line-height: 50px;
    margin-left: 10px;
    word-break: break-word;
    color: #000;
    padding: 5px;
    line-height: 18px;
    &::after {
      content: "";
      display: block;
      position: absolute;
      width: 0;
      height: 0;
      border: 8px solid transparent;
      border-right-color: #ccc;
      top: 5px;
      left: -14px;
    }
  }
}
.self {
  display: flex;
  flex-direction: row-reverse;
  .msg__text {
    background: #12B7F5;
    margin-left: 0;
    margin-right: 10px;
    &::after {
      border-right-color: transparent;
      border-left-color: #12B7F5;
      right: -14px;
      left: unset
    }
  }
}
</style>
