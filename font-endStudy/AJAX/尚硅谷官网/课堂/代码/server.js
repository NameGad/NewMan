//1.引入express
const { response } = require('express');
const { request } = require('express');
const express = require('express');
const { send } = require('express/lib/response');

//2. 创建应用对象
const app = express( );

//3. 创建路由规则
// request 是对请求报文的封装
// response 是对响应报文的封装
app.get('/server', (request,response)=>{
    //设置响应头    设置允许跨域
    // response.setHeader('Access-ControAllow-Origin','*');
    response.setHeader('Access-Control-Allow-Origin','*')
    
    //设置响应体
    response.send('HELLO EXPRESS GET GET GET');
});

app.all('/server', (request,response)=>{
    //设置响应头    设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*')
    response.setHeader('Access-Control-Allow-Headers','*');
    //设置响应体
    response.send('HELLO EXPRESS POST POST POST');
});

app.all('/json-server', (request,response)=>{
    //设置响应头    设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*')
    response.setHeader('Access-Control-Allow-Headers','*');
   
    //响应一个参数
    const date = {
        name : 'LinJiaCheng',
        study : 'JSON',
    }
    //将对象转化为字符串
    let str =JSON.stringify(date);
    //设置响应体
    response.send(str);
});

 // 针对IE缓存
app.all('/ie', (request,response)=>{
    //设置响应头    设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*')
    response.setHeader('Access-Control-Allow-Headers','*');
    //设置响应体
    response.send('HELLO IE your are so wonderful s');
});

//延时缓存
app.all('/delay', (request,response)=>{
    //设置响应头    设置运行跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    response.setHeader('Access-Control-Allow-Headers','*');
    setTimeout(() => {
        response.send('延时响应');  
    }, 1000);
}); 

//JQuery
app.all('/jquery-server', (request,response)=>{
    //设置响应头    设置运行跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    response.setHeader('Access-Control-Allow-Headers','*');
    // response.send('Hello JQuery AJAX');
    const data = {name: 'LinJiaCheng'};
    // response.send(data);
    response.send(JSON.stringify(data));
}); 

//Axios 服务
app.all('/axios-server', (request,response)=>{
    //设置响应头    设置运行跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    response.setHeader('Access-Control-Allow-Headers','*');
    response.header("Access-Control-Allow-Origin","*");
    // response.send('Hello JQuery AJAX');
    const data = {name: '林佳成'};
    // response.send(data);
    response.send(JSON.stringify(data));
}); 

//fetch 服务
app.all('/fetch-server', (request,response)=>{
    //设置响应头    设置运行跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    response.setHeader('Access-Control-Allow-Headers','*');
    response.header("Access-Control-Allow-Origin","*");
    // response.send('Hello JQuery AJAX');
    const data = {name: '林佳成'};
    // response.send(data);
    response.send(JSON.stringify(data));
}); 

//jsonp服务
app.all('/jsonp-server', (request, response) =>{
    // response.send("hello jsonp-server");
        // response.send('console.log("hello jsonp-server")');

    const data = {
        name: '林佳成666'
    };
    //将数据转换为字符串
    let str = JSON.stringify(data);
    //返回结果
    response.end(`handle(${str})`);
})

//检查用户名是否存在（JSONP）
app.all('/check-username', (request, response) =>{
    // response.send("hello jsonp-server");
    // response.send('console.log("hello jsonp-server")');
        
    const data = {
        exist: 1,
        msg: "用户名已经存在",
    };

    //将数据转换为字符串
    let str = JSON.stringify(data);
    //返回结果
    response.end(`handle(${str})`);
})

//JQuery-JSONP
app.all('/jquery-jsonp-server', (request, response) =>{
    // response.send("hello jsonp-server");
    // response.send('console.log("hello jsonp-server")');      
    const data = {
        name: '林佳成',
        hobby: ['敲代码','游泳','跑步'],
    };
    //将数据转换为字符串
    let str = JSON.stringify(data);
    let cb = request.query.callback;
    //返回结果
    response.end(`${cb}(${str})`);
})

//cors
app.all('/cors-sevrer', (request, response) =>{
    response.setHeader("Access-Control-Allow-Origin", '*');
    response.setHeader('Access-Control-Allow-Headers', "*");
    response.setHeader('Access-Control-Allow-Method', '*');
    response.send('hello cors');
})

//4. 监听端口启动服务
app.listen(8000, ()=>{
    console.log("服务器已经启动,8000 端口监听中");
})