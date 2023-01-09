<template>
  <div class="home">
    <ul>
      <li v-for="item of msgList" :key="item.index">
        <p>
          <span>{{item.username}}</span>
          <span>{{item.date}}</span>
          <span>{{item.msg}}</span>
        </p>
      </li>
    </ul>
    <input type="text" placeholder="请输入消息">
    <button>点击发送消息</button>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  setup(){
    // 生命周期
    onMounted(() => {
      username.value = localStorage.getItem('username')

      if(username.value){
        router.push('/login')
        return
      }
    })
  }
}
</script>
