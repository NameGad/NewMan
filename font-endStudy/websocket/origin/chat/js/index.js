;((doc) => {
  
  const list = doc.querySelector('#list')
  const msgInput = doc.querySelector('#messageInput')
  const sendBtn = doc.querySelector('#sendMessage')
  const ws = new WebSocket('ws:localhost:8000')
  let username = ''
  
  function init(){
    bindEvent();
  }

  function bindEvent(){
    sendBtn.addEventListener('click', handleSendBtnClick, false)
    ws.addEventListener('open', handleOpen, false)
    ws.addEventListener('close', handleClose, false)
    ws.addEventListener('error', handleError, false)
    ws.addEventListener('message', handleMessage, false)
  }
  
  // 点击发送按钮事件
  function handleSendBtnClick(){
    // 先服务端发送数据
    ws.send(JSON.stringify({
      username,
      dateTime:new Date().getTime(),
      msg: msgInput.value
    }))
  }
  // open 建立连接时触发
  function handleOpen(e){
    console.log('websocket open', e);
    username = localStorage.getItem('username')
    // 如果username为空，返回登陆页面
    if(!username){
      location.href = 'entry.html'
    }
  }

  function handleClose(e){
    console.log('websocket close', e);
  }

  function handleError(e){
    console.log('websocket error', e);
  }

  function handleMessage(e){
    // 接收服务端发来的消息
    console.log('websocket message', e);
    console.log(JSON.parse(e.data));
    list.appendChild(createNode(JSON.parse(e.data)))
  }

  // 创建插入ul的节点函数
  function createNode(data){
    let {username, dateTime, msg} = data
    const liNode = document.createElement('li')
    liNode.innerHTML = `
    用户: <u>${username}</u>
    时间: <i> ${new Date(dateTime)}</i>
    消息: <b>${msg}</b>
    `
    return liNode
  }
  

  init()
})(document)