const Koa = require('koa');
const Router = require('koa-router')

const app = new Koa();
const fs = require('fs');
const server = require('http').Server(app.callback());
const io = require('socket.io')(server);

const router = new Router()

router.prefix('/socket')

router.get('/index',(ctx,next)=>{
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./index.html');
})

io.on('connection', socket => {
    console.log('初始化成功！下面可以用socket绑定事件和触发事件了');
    socket.on('send', data => {
         console.log('客户端发送的内容：', data);
         io.sockets.emit('getMsg', data.msg)
         // socket.emit('getMsg', '我是返回的消息... ...');
    })
})

module.exports = router