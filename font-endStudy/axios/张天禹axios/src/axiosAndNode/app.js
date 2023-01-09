const express = require('express')
const app = express()

app.get('/api/person', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.send({
    status:200,
    masg:'获取成功',
    data:{
      id:'44058220011104',
      name:'林林林',
      age: 18
    }
  })
})

app.listen(8888, function(){
  console.log('Express server running at http://127.0.0.1:8888')
})
