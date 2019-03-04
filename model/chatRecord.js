const mongoose = require('../db/db.js')
const Schema = mongoose.Schema

const ChatRecordschema = new Schema({
    msgId: { type: String }, // 消息id
    msgType: { type: Number }, // 消息类型 1：文字 2：emoji 3：音频 4：视频 5：红包 6：转账 7：位置分享 8：图片 9：文件
    sendId: { type: String }, // 发送人id
    content: { type: String }, // 消息内容
    receiveId: { type: String }, // 接收人id
}, { timestamps: {createdAt: 'created', updatedAt: 'updated' }})

module.exports = mongoose.model('ChatRecord', ChatRecordschema)