((doc, location, localStorage) => {
  const username = doc.querySelector('#userName')
  const enterBtn = doc.querySelector('#entry')

  const init = () => {
    btnEvent()
  }

  function btnEvent() {
    enterBtn.addEventListener('click', handleEnterBtnClick, false)
  }
  
  function handleEnterBtnClick(){
    const usernameValue = username.value.trim()
    // 用户名不合法
    if(usernameValue.length < 6) {
      alert('用户名长度小于6')
      return
    }

    // 用户名合法
    localStorage.setItem('username', usernameValue)
    location.href = 'index.html'
  }

  init()
})(document, location, localStorage)