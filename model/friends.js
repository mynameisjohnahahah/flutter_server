const mongoose = require('../db/db.js')
const Schema = mongoose.Schema

const Friendschema = new Schema({
    userId: { type: String }, // 用户id
    friendId: { type: String }, // 好友id
    userName: { type: String } // 好友名
})

module.exports = mongoose.model('Friends', Friendschema)