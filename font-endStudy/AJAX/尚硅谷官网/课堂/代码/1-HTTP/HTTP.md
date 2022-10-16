<!-- npx nodemon .\server.js（启动服务器） -->
## 请求报文
重点是格式和参数

行      POST     /s?ie=utf-8 HTTP/1.1
头      Host:   atguigu.com
        Cookie: name = guigu
        Content-type:  application/x-www-form-urlecoded
        User-Agent: chrome 83
空行
体      username=admin&password=admin

## 响应报文

行      HTTP/1.1    200     OK
头      Content-Type: text/html;charset=utf-8
         Content-length: 2048
         Content-encoding: gzip
空行
体     <html>
                <head>
                </head>
                <body>
                    <h1>尚硅谷</h1>
                </body>
        </html>