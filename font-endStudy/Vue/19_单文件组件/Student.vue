<template>
  <div>
    <h1>姓名：{{name}}</h1>
    <h2>年龄：{{age}}</h2>
  </div>
</template>

<script>
    export default {
      name:'Student',
        data() {
            return {
                name:'林佳成',
                age: '22'
            }
        },
    }
</script>

<style>

</style>