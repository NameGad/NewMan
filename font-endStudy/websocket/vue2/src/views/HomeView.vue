<template>
  <div class="home">
    <ul>
      <li v-for="msgItem of msgList" :key="msgItem.index">
        <u>用户： {{msgItem.username}}</u>
        <i>-----时间： {{msgItem.dateTime}}-----</i>
        <b>消息： {{msgItem.msg}}</b>
      </li>
    </ul>
    <input type="text" v-model="msg" placeholder="请输入消息">
    <button @click="sendMessage">发送消息</button>
  </div>
</template>

<script>
const ws = new WebSocket('ws:localhost:8000')
export default {
  name: 'HomeView',
  data() {
    return {
      msg:'', // 用户输入的消息
      username:'', //用户名
      msgList: [] //消息列表
    }
  },
  mounted(){
    // 组件挂载完毕，获取用户名
    this.username = localStorage.getItem('username')
    if(!this.username){
      this.$router.push('/login')
    }

    ws.addEventListener('close', this.handleWsClose.bind(this), false)
    ws.addEventListener('open', this.handleWsOpen.bind(this), false)
    ws.addEventListener('error', this.handleWsError.bind(this), false)
    ws.addEventListener('message', this.handleWsMessage.bind(this), false)
  },
  methods: {
    // 点击发送按钮
    sendMessage(){
      if(!this.msg.trim().length) return
      // 向服务器发送消息
      ws.send(JSON.stringify({
        username: this.username,
        dateTime: new Date().getTime(),
        msg: this.msg
      }))
      // 情况输入框
       this.msg = ''
    },
    handleWsOpen(e){
      console.log('WS open');
    },
    handleWsClose(e){
      console.log('WS close');
    },
    handleWsError(e){
      console.log('WS error');
    },
    handleWsMessage(e){
      console.log('WS message', e);
      // 接受消息
      this.msgList.push(JSON.parse(e.data))
    }
  },
  
}
</script>
