<template>
  <div class="login">
    <input type="text" placeholder="请输入用户名" v-model="username">
    <button @click="handleEnterBtnClick">进入聊天室</button>
  </div>  
</template>

<script>
import { ref, onMounted } from 'vue'
// import { useRoute } from 'vue-router'
import router from '@/router';

export default {
  name:'LoginView',
  setup() {
    const username = ref('');
  
    const handleEnterBtnClick = () => {
      const usernameValue = username.value.trim()

      if(!usernameValue) return
      if(usernameValue.length < 5){
        alert('用户名小于5');
        return
      }
      
      localStorage.setItem('username', usernameValue)
      username.value = ''
      router.push('/')
    }

    return {
      username,
      handleEnterBtnClick
    }
  }
}
</script>

