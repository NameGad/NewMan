<template>
  <div class="loginContainer">
    <input type="text" v-model="username" placeholder="请输入用户名" />
    <button @click="handleEnterBtnClick">加入聊天室</button>
  </div>
</template>
<script>
export default {
  name:'LoginView',
  data() {
    return {
      username:''
    }
  },
  methods: {
    handleEnterBtnClick(){
      const username = this.username.trim()
      if(!username){
        alert('名字不能为空')
        return
      }else if(username.length < 5){
        alert('名字长度小于5')
        return
      } 
      // 用户名判断成功
      localStorage.setItem('username', username)
      this.$router.push('/')
    }
  }
}
</script>