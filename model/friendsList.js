const mongoose = require('../db/db.js')
const Schema = mongoose.Schema

const FriendsListschema = new Schema({
    applyId: { type: String }, // 申请人id
    beInvited: { type: String }, // 被邀请人id
    applyRemarks: { type: String }, // 申请备注
    rejectRemarks: { type: String }, // 拒绝备注
    status: {type: Number}, // 状态 0申请中，1申请通过，2拒绝
})

module.exports = mongoose.model('FriendsList', FriendsListschema)
