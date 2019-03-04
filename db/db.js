const mongoose = require('mongoose')
const url = "mongodb://lxp:25041ezvn@119.29.119.87:27017/clientInfo"

// 连接
mongoose.connect(url, {
    useNewUrlParser: true
})
// 连接成功
mongoose.connection.on('connected', () => {
    console.log('Mongoose connection open to ' + url)
})
// 连接失败
mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error:' + err)
})
// 断开连接
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection disconnected')
})

module.exports = mongoose