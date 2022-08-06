<template>
  <div>
    <h1>校名：{{name}}</h1>
    <h2>地区：{{address}}</h2>
    <Student></Student>
  </div>
</template>

<script>
    import Student from './Student.vue';
    export default {
        data() {
            return {
                name:'SZIIT',
                address: '深圳'
            }
        },
        components:{
            Student
        }
    }
</script>

<style>

</style>