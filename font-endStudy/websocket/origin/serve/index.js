const Ws = require('ws')
// ws:localhost:8000
const server = new Ws.Server({ port:8000 })

const init = () => {
  bindEvent()
}

function bindEvent(){
  server.on('open', handleOpen)
  server.on('close', handleClose)
  server.on('error', handleError)   
  server.on('connection', handleConnection)
}

function handleOpen(){
  console.log('Websocket Open');
}

function handleClose(){
  console.log('Websocket Close');
}

function handleError(){
  console.log('Websocket Error');
}

function handleConnection(ws){
  console.log('Websocket Connection');
  ws.on('message', handleMessage)
  // console.log(e);
}

function handleMessage(msg){
  // node接收的数据需要toString转化
  // 此处记录了所有客户端，可以在此处向所有客户端广播
  console.log(msg.toString());
  server.clients.forEach(c => {
    c.send(msg.toString())
  })
}

init()