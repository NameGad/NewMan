const Ws = require('ws')
const server = new Ws.Server({ port: 8000 })

const init = () => {
  bindEvent()
}

function bindEvent(){
  server.on('open', handleOpen)
  server.on('error', handleError)
  server.on('close', handleClose)
  server.on('connection', handleConnection)
}

function handleOpen(){
  console.log('Server: WebSocket Open');
}
function handleError(){
  console.log('Server: WebSocket Error');
}
function handleClose(){
  console.log('Server: WebSocket Close');
}
function handleConnection(ws){
  console.log('Server: WebSocket Connection');
  ws.on('message', handleMessage)
}

function handleMessage(msg){
  console.log(JSON.parse(msg));
  // 客户端广播
  server.clients.forEach(c => {
    c.send(JSON.stringify(JSON.parse(msg)))
  })
}
init();