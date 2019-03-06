const Koa = require('koa');
const app = new Koa()
const cors = require('koa2-cors')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const server = require('http').Server(app.callback())
const io = require('socket.io')(server)
const registerRouter  = require('./routes')
const Router = require('koa-router')
const fs = require('fs');

const router = new Router()
const port = 8765

app.use(cors()) // 跨域

app.use(bodyParser()) // 解析body
app.use(registerRouter())

// 配置静态web服务的中间件
app.use(static(__dirname + '/public'))

router.get('/',(ctx, next)=>{
     ctx.response.type = 'html';
     ctx.response.body = fs.createReadStream('./index.html');
 })
io.on('connection', socket => {
     console.log('初始化成功！下面可以用socket绑定事件和触发事件了')
     socket.on('send', data => {
          console.log('客户端发送的内容：', data);
          io.sockets.emit('getMsg', data.msg)
          // socket.emit('getMsg', '我是返回的消息... ...')
     })
})

server.listen(process.env.PORT || port, () => {
     console.log(`app run at : http://119.29.119.87:${port}`)
})

// module.exports = app;
