const Router = require('koa-router')
const Friends = require('../model/friends')

const router = new Router()

router.prefix('/friends')

// 添加好友
router.post('/add', async (ctx, next) => {
    let data = ctx.request.body

    let Friend = new Friends({
        userId: data.userId,
        friendId: data.friendId,
        userName: data.userName
    })

    Friend.save((err, res) => {
        if(err) {
            console.log('添加失败')
            ctx.body = { code: -1, msg: 'error' }
        } else {
            console.log('添加成功')
            ctx.body = { code: 0, msg: 'success' }
        }
    })
})

router.delete('/', async (ctx, next) => {
    let data = ctx.query

    console.log(data)
})

module.exports = router