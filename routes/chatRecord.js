const Router = require('koa-router')
const ChatRecord = require('../model/chatRecord')

const router = new Router()

router.prefix('/chatRecord')

// 添加消息记录
router.post('/create', async (ctx, next) => {
    let data = ctx.request.body

    let chatRecord = new ChatRecord({
        msgId: data.msgId,
        msgType: data.msgType,
        sendId: data.sendId,
        content: data.content,
        receiveId: data.receiveId,
        sendTime: data.sendTime,
    })

    chatRecord.save((err, res) => {
        if(err) {
            console.log('添加失败')
            ctx.body = { code: -1, msg: 'error' }
        } else {
            console.log('添加成功')
            ctx.body = { code: 0, msg: 'success' }
        }
    })
})

// 获取A和B的消息记录

router.delete('/', async (ctx, next) => {
    let data = ctx.query

    console.log(data)
})

//
router.get('/', async (ctx, next) => {
    let data = ctx.query
})

module.exports = router