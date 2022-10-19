const express = require('express')
const app = express()
// 使用内置中间件去解析post请求中以urlencoded形式编码的参数
app.use(express.urlencoded({extended:true}))
app.use(express.json())
// 暴露静态资源
app.use(express.static(__dirname+'/src'))

// 发送验证码
app.get('/get_verify_code',(request,response)=>{
  console.log('有人来获取验证码了');
  let code = Math.floor(Math.random()*8999 + 1000)
  setTimeout(()=>{
    response.send(code.toString())
  },1000)
})

app.post('/test_post',(request,response)=>{
  response.send('hello_test_post')
  console.log('有人请求了hello_test_get2---携带的参数是：',request.body);
})
// cors解决跨域
app.get('/test_get3',(request,response)=>{
  response.set('Access-Control-Allow-Origin','http://127.0.0.1:5500')
  console.log('有人请求了hello_test_get1---携带的参数是：',request.query);
  // 后端的person数据
  let person = {name:'林佳成', age:18}
  response.send(person)
})
app.post('/test_post3',(request,response)=>{
  response.set('Access-Control-Allow-Origin','*')
  response.send({name:'Access-Control-Allow-Origin', age: 18})
  console.log('有人请求了hello_test_get2---携带的参数是：',request.body);
})
// JSONP解决跨域
app.get('/test_get1',(request,response)=>{
  console.log('有人请求了hello_test_get1---携带的参数是：',request.query);
  let { callback } = request.query
  // 后端的person数据
  let person = {name:'林佳成', age:18}
  response.send(`${callback}(${JSON.stringify(person)})`)
})

app.get('/test_get',(request,response)=>{
  response.send('这里是hello_test_get，你拿到数据了')
  console.log('有人请求了hello_test_get---携带的参数是：',request.query);
})
// 传递params参数，需要提前占位
app.get('/test_get2/:name/:age',(request,response)=>{
  response.send('hello_test_get2')
  console.log('有人请求了hello_test_get2---携带的参数是：',request.params);
})


app.listen(8080,(err)=>{
  if(!err) console.log('测试AJax请求服务器开启成功');
})