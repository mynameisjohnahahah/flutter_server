const mongoose = require('../db/db.js')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: { type: String }, // 用户名
    password: { type: String }, // 密码
    slat: { type: String } // 盐
})

// model是由schema生成的模型，具有对数据库操作的能力
module.exports = mongoose.model('User', UserSchema)