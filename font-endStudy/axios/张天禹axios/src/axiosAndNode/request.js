import axios from "axios"; 
 
let request = axios.create({})

request.interceptors.request.use((config)=>{
  config.baseURL = 'http://127.0.0.1:8888/api',
  config.timeout = 3000
  
  if(new Date() % 2 == 0){
    return config
  }else{
    console.log('时间戳为奇数，请求失败')
  }
})

request.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.log('响应拦截器失败的回调执行了',error)
    return new Promise(()=>{})
  }
)

export default request;