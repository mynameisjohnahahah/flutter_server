const Koa = require('koa')
const app = new Koa()
const server = require('http').Server(app.callback())
const io = require('socket.io')(server)

io.on('connection', socket => {
    console.log('初始化成功！下面可以用socket绑定事件和触发事件了');
    socket.on('send', data => {
         console.log('客户端发送的内容：', data);
         io.sockets.emit('getMsg', data.msg)
         // socket.emit('getMsg', '我是返回的消息... ...');
    })
})

exports.listen = function(charServer){    
	return io.listen(charServer);    // listening 
};